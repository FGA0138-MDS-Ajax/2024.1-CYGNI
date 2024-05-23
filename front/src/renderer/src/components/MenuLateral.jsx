import React from "react";
import Icone from "../assets/img/IconeAGIS.svg";
import Inicio from "../assets/img/Inicio.svg";
import Campanha from "../assets/img/Calendário.svg";
import Escala from "../assets/img/Escalas.svg";
import Relatorio from "../assets/img/Relatorio.svg";
import Sair from "../assets/img/Sair.svg";

import { Link } from "react-router-dom";

import "../styles/MenuLateral.css";

const MenuLateral = () => {
    return (
        <div className="menu-lateral">
            <img src={Icone} alt="icone" id='icone' />
            <div className="conteiner-conteudo">
                <ul>
                    <li>
                        <img src={Inicio} alt="tela inicial" />
                        <Link to="/inicial">Tela Inicial</Link>
                    </li>
                    <li>
                        <img src={Campanha} alt="campanha" />
                        <Link to="">Campanha</Link>
                    </li>
                    <li>
                        <img src={Escala} alt="escala" />
                        <Link to="">Escala</Link>
                    </li>
                    <li>
                        <img src={Relatorio} alt="realtorio mensal" />
                        <Link to="">Relatório Mensal</Link>
                    </li>
                </ul>
            </div>
            <div className="conteiner-saida">
                <img src={Sair} alt="sair" />
                <Link to="/">Sair</Link>
            </div>
        </div>
    )
}

export default MenuLateral;