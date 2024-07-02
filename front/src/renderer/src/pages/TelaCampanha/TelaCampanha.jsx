import React from "react";
import { useForm } from "react-hook-form";
import MenuLateral from "../../components/MenuLateral/MenuLateral";
import { useLocation } from "react-router-dom";
import "../TelaRelatorio/TelaRelatorio.css";
import TabelaFuncionarios from "../../components/TabelaCampanha/tabelaCampanha.jsx";

const TelaCampanha = () => {
    return (
        <div className="conteiner-relatorio-mensal">
            <MenuLateral />
        </div>
    );
};

export default TelaCampanha;
