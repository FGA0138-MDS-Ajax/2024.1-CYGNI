import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import MenuLateral from "../../components/MenuLateral/MenuLateral";
import { useLocation } from "react-router-dom";
import "../TelaCampanha/TelaCampanha.css";
import Timeline, { DateHeader, TimelineHeaders } from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';
import { FiDownload } from "react-icons/fi";
import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import Botao from "../../components/Botao/Botao";
import * as XLSX from 'xlsx'; // Importação da biblioteca XLSX para manipulação de Excel
dayjs.extend(utc);

const BASE_URL = "http://localhost:80";

const createConfig = () => {
    return {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
        }
    }
};

const markNonWorkDays = (escalaInicio, escala) => {
    const allDays = [];
    const workDays = new Set();
    let startOfDay = dayjs.utc(escalaInicio).startOf('day');

    for (let i = 0; i < 365; i++) {
        const currentDate = startOfDay.add(i, 'day').format('YYYY-MM-DD');
        allDays.push(currentDate);
    }

    switch (escala) {
        case 'Expediente':
            for (let i = 0; i < 365; i++) {
                const currentDate = startOfDay.add(i, 'day');
                if (currentDate.day() >= 1 && currentDate.day() <= 5) {
                    workDays.add(currentDate.format('YYYY-MM-DD'));
                }
            }
            break;
        case '12 x 36':
            for (let i = 0; i < 365; i += 2) {
                const currentDate = startOfDay.add(i, 'day');
                workDays.add(currentDate.format('YYYY-MM-DD'));
            }
            break;
        case '24 x 72':
            for (let i = 0; i < 365; i += 4) {
                const currentDate = startOfDay.add(i, 'day');
                workDays.add(currentDate.format('YYYY-MM-DD'));
            }
            break;
        case '8 x 40':
            for (let i = 0; i < 365; i += 7) {
                const weekStart = startOfDay.add(i, 'days');
                if (Math.floor(i / 7) % 2 === 0) {
                    workDays.add(weekStart.format('YYYY-MM-DD'));
                    workDays.add(weekStart.add(2, 'days').format('YYYY-MM-DD'));
                    workDays.add(weekStart.add(4, 'days').format('YYYY-MM-DD'));
                } else {
                    workDays.add(weekStart.add(1, 'days').format('YYYY-MM-DD'));
                    workDays.add(weekStart.add(3, 'days').format('YYYY-MM-DD'));
                    workDays.add(weekStart.add(5, 'days').format('YYYY-MM-DD'));
                }
            }
            break;
        case '12 x 60':
            for (let i = 0; i < 365; i += 3) {
                const currentDate = startOfDay.add(i, 'day');
                workDays.add(currentDate.format('YYYY-MM-DD'));
            }
            break;
        default:
            break;
    }

    const nonWorkDays = allDays.filter(day => !workDays.has(day));
    return { workDays: Array.from(workDays), nonWorkDays };
}

const calculateUnavailableDays = (dataInicio, dataTermino) => {
    const unavailableDays = [];
    const startDate = dayjs.utc(dataInicio).startOf('day');
    const endDate = dayjs.utc(dataTermino).endOf('day');

    let currentDate = startDate;
    while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
        unavailableDays.push(currentDate.format('YYYY-MM-DD'));
        currentDate = currentDate.add(1, 'day');
    }

    return unavailableDays;
}

const TelaCampanha = () => {
    const location = useLocation();
    const funcionario = location.state?.funcionario;

    const [groups, setGroups] = useState([]);
    const [items, setItems] = useState([]);

    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        const fetchFuncionarios = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/usuarios`, createConfig());
                const data = response.data;

                const fetchedGroups = data.map((func) => ({
                    id: func._id,
                    title: func.nomeCompleto,
                }));

                const fetchedItems = data.flatMap((func, index) => {
                    const { escalaInicio, escala, dataInicio, dataTermino } = func;
                    const { workDays, nonWorkDays } = markNonWorkDays(escalaInicio, escala);
                    const unavailableDays = calculateUnavailableDays(dataInicio, dataTermino);

                    const items = workDays.map(day => ({
                        id: `${func._id}-${day}`,
                        group: func._id,
                        title: 'SV',
                        start_time: moment(day),
                        end_time: moment(day).endOf('day'),
                        isWorkDay: true,
                        itemProps: {
                            style: {
                                color: "#307764", // Cor para dias de trabalho
                                background: "none", // Fundo transparente
                                fontWeight: "bold",
                                border: "none",
                                left: 0
                            }
                        }
                    })).concat(
                        nonWorkDays.map(day => ({
                            id: `${func._id}-${day}`,
                            group: func._id,
                            title: 'X',
                            start_time: moment(day),
                            end_time: moment(day).endOf('day'),
                            isWorkDay: false,
                            itemProps: {
                                style: {
                                    color: "red", // Cor para dias sem trabalho
                                    background: "none",
                                    fontWeight: "bold",
                                    border: "none",
                                    left: 0
                                }
                            }
                        }))
                    );

                    unavailableDays.forEach(day => {
                        const itemIndex = items.findIndex(item => item.start_time.isSame(moment(day)));
                        if (itemIndex !== -1) {
                            items[itemIndex].title = 'AF';
                            items[itemIndex].isWorkDay = false;
                            items[itemIndex].itemProps.style.color = "blue";
                        } else {
                            items.push({
                                id: `${func._id}-${day}`,
                                group: func._id,
                                title: 'AF',
                                start_time: moment(day),
                                end_time: moment(day).endOf('day'),
                                isWorkDay: false,
                                itemProps: {
                                    style: {
                                        color: "blue", // Cor para dias sem trabalho
                                        background: "none",
                                        fontWeight: "bold",
                                        border: "none"
                                    }
                                }
                            });
                        }
                    });

                    return items;
                });

                setGroups(fetchedGroups);
                setItems(fetchedItems);
            } catch (error) {
                console.error('Erro ao buscar funcionários:', error);
            }
        };

        fetchFuncionarios();
    }, []);

    const exportToExcel = () => {
        const workbook = XLSX.utils.book_new();
        const dataToExport = [['Funcionário']];

        // Adiciona os cabeçalhos de coluna com as datas
        let startDate = moment().startOf('month');
        let endDate = moment().endOf('month');
        let currentDate = startDate;

        while (currentDate.isSameOrBefore(endDate, 'day')) {
            dataToExport[0].push(currentDate.format('DD/MM'));
            currentDate = currentDate.add(1, 'day');
        }

        // Adiciona os dados dos funcionários
        groups.forEach(group => {
            const rowData = [group.title];

            startDate = moment().startOf('month');
            currentDate = startDate;

            while (currentDate.isSameOrBefore(endDate, 'day')) {
                const cellDate = currentDate.format('YYYY-MM-DD');
                const cellItem = items.find(i => i.group === group.id && i.start_time.isSameOrBefore(currentDate) && i.end_time.isSameOrAfter(currentDate));

                if (cellItem && cellItem.isWorkDay) {
                    rowData.push('SV');
                } else {
                    rowData.push('X');
                }

                currentDate = currentDate.add(1, 'day');
            }

            dataToExport.push(rowData);
        });

        const ws = XLSX.utils.aoa_to_sheet(dataToExport);
        XLSX.utils.book_append_sheet(workbook, ws, "Funcionários");

        XLSX.writeFile(workbook, "campanha.xlsx");
    };
    return (
        <div className="campanha">
            <MenuLateral />
            <div className="conteiner-campanha">
                <div className="conteiner-textos-campanhas">
                    <h1>Campanha</h1>
                    <p>Gerenciamento da disponibilidade de funcionários para todos os dias da semana.</p>
                    <div className="botao-exportar">
                        <div className="titulo-legenda">
                            <p>SV = serviço  </p>
                            <p>X = indisponível  </p>
                            <p>AF = afastado  </p>
                        </div>
                        <Botao
                            texto="Exportar para Excel"
                            icone={<FiDownload size={20} style={{ marginRight: "5px" }} />}
                            cor="#fff"
                            corTexto="#032026"
                            largura={"20%"}
                            aoClicar={exportToExcel}
                        />
                    </div>
                </div>
                <Timeline
                    groups={groups}
                    items={items}
                    maxZoom={30 * 24 * 60 * 60 * 1000}
                    minZoom={30 * 24 * 60 * 60 * 1000}
                    defaultTimeStart={moment().startOf('month')}
                    defaultTimeEnd={moment().endOf('month')}
                    canMove={false}
                    canChangeGroup={false}
                    lineHeight={50}
                    itemHeightRatio={0.75}
                    stackItems
                    sidebarWidth={150}
                    style={{ height: "85%", width: "92%", backgroundColor: "white" }}
                >
                    <DateHeader
                        unit="primaryHeader"
                    />
                </Timeline>
            </div>
        </div>
    );
}

export default TelaCampanha;