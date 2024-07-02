import React from "react";
import { useForm } from "react-hook-form";
import MenuLateral from "../../components/MenuLateral/MenuLateral";
import { useLocation } from "react-router-dom";
import "../TelaRelatorio/TelaRelatorio.css";
import { DateCalendarServerRequest } from '../../components/calendario/calendario.jsx';







const TelaCalendario = () => {
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
        <div className="conteiner-relatorio-mensal">
            <MenuLateral />
            <div className="conteiner-relatorio">
                <h1>Campanha Individual</h1>
                <h2>Confira aqui os dias de trabalho e afastamento do funcionário selecionado</h2>
                <h3>Funcionário selecionado: {`${funcionario.nomeCompleto}`}</h3>
                <DateCalendarServerRequest user={funcionario} />
            </div>
        </div>
    );
};

export default TelaCalendario;
