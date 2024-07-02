import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import MenuLateral from "../../components/MenuLateral/MenuLateral";
import { useLocation } from "react-router-dom";
import "../TelaRelatorio/TelaRelatorio.css";
import Timeline,{DateHeader} from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';
import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
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
                    const { escalaInicio, escala } = func;
                    const { workDays, nonWorkDays } = markNonWorkDays(escalaInicio, escala);

                    return [
                        ...workDays.map((day, idx) => ({
                            id: `${func._id}-work-${idx}`,
                            group: func._id,
                            title: 'O',
                            start_time: moment(day),
                            end_time: moment(day).endOf('day'),
                            style: { backgroundColor: 'green' }
                        })),
                        ...nonWorkDays.map((day, idx) => ({
                            id: `${func._id}-nonwork-${idx}`,
                            group: func._id,
                            title: 'X',
                            start_time: moment(day),
                            end_time: moment(day).endOf('day'),
                            style: { backgroundColor: 'red' }
                        }))
                    ];
                });

                setGroups(fetchedGroups);
                setItems(fetchedItems);
            } catch (error) {
                console.error('Erro ao buscar funcionários:', error);
            }
        };

        fetchFuncionarios();
    }, []);
    

    return (
        <div className="conteiner-relatorio-mensal">
            <MenuLateral />
            <div className="conteiner-relatorio">
                <Timeline
                    groups={groups}
                    items={items}
                    defaultTimeStart={moment().startOf('month')}
                    defaultTimeEnd={moment().endOf('month')}
                    canMove={false} // Disable moving items
                    canChangeGroup={false} // Disable changing groups
                    lineHeight={50} // Adjust line height as needed
                    itemHeightRatio={0.75} // Adjust item height ratio as needed
                    stackItems // Stack overlapping items
                    
                   
                    
                >

                    <DateHeader 
                    unit="month" />

                </Timeline>
                
            </div>
        </div>
    );
};

export default TelaCampanha;