import React from "react";
import "../styles/MenuLateral.css";
import Icone from "../assets/img/IconeAGIS.svg";
import Inicio from "../assets/img/Inicio.svg";
import Campanha from "../assets/img/Calendário.svg";
import Escala from "../assets/img/Escalas.svg";
import Relatorio from "../assets/img/Relatorio.svg";
import Sair from "../assets/img/Sair.svg";

const MenuLateral = () => {
    return (
        <div className="menu-lateral">
            <img src={Icone} alt="icone" id='icone'/>
            <div className="conteiner-conteudo">
                <ul>
                    <li>
                       <img src={Inicio} alt="tela inicial"/>
                        <a href="">Tela Inicial</a>
                    </li>
                    <li>
                        <img src={Campanha} alt="campanha"/>
                        <a href="">Campanha</a>
                    </li>
                    <li>
                        <img src={Escala} alt="escala"/>
                        <a href="">Escala</a>
                    </li>
                    <li>
                        <img src={Relatorio} alt="realtorio mensal"/>
                        <a href="">Relatório Mensal</a>
                    </li>
                </ul>
            </div>
            <div className="conteiner-saida">
                <img src={Sair} alt="sair"/>
                <a href="">Sair</a>
            </div>
        </div>
    )
}

export default MenuLateral;