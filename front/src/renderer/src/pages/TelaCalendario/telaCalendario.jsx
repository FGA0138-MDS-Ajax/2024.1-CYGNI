import React from "react";
import { useForm } from "react-hook-form";
import MenuLateral from "../../components/MenuLateral/MenuLateral";
import { useLocation } from "react-router-dom";
import "../TelaRelatorio/TelaRelatorio.css";
import { DateCalendarServerRequest } from '../../components/calendario/calendario.jsx';
import Botao from "../../components/Botao/Botao.jsx";
import { HiArrowUturnLeft } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import './telaCalendario.css'

const TelaCalendario = () => {
    const navegar = useNavigate();
    const location = useLocation();
    const funcionario = location.state?.funcionario;
    console.log('funcionari', { funcionario })
    const {
        register,
        handleSubmit,
        trigger,
        formState: { errors },
    } = useForm();
    return (
        <div className="conteiner-tela-calendario">
            <MenuLateral />
            <div className="conteiner-calendario">
                <div className="botao-voltar">
                    <Botao
                        id="voltar"
                        icone={<HiArrowUturnLeft size={20} style={{ marginRight: "5px" }} />}
                        texto="Voltar"
                        cor="#032026"
                        corTexto="#fff"
                        largura={"130px"}
                        aoClicar={() => {
                            navegar("/tela-cadastro", { state: { funcionario } });
                        }}
                    />
                </div>
                <h1>Campanha Individual</h1>
                <h2>Confira aqui os dias de trabalho e afastamento do funcionário selecionado.</h2>
                <DateCalendarServerRequest user={funcionario} />
                <p>Funcionário selecionado: {`${funcionario.nomeCompleto}`}</p>
            </div>
        </div>
    );
};

export default TelaCalendario;
