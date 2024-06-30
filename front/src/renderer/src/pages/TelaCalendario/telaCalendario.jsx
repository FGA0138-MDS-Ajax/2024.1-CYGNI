import React from "react";
import { useForm } from "react-hook-form";
import MenuLateral from "../../components/MenuLateral/MenuLateral";
import { useLocation } from "react-router-dom";
import "../TelaRelatorio/TelaRelatorio.css";
import { DateCalendarServerRequest } from '../../components/calendario/calendario.jsx';







const TelaCalendario = () => {
    const location = useLocation();
    const funcionario = location.state?.funcionario;

   

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
            <DateCalendarServerRequest user={funcionario} />
            </div>
        </div>
    );
};

export default TelaCalendario;
