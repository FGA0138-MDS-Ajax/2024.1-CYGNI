import React, { useState } from "react";
import Icone from "../assets/img/IconeAGIS.svg";
import Inicio from "../assets/img/Inicio.svg";
import Campanha from "../assets/img/Calendário.svg";
import Escala from "../assets/img/Escalas.svg";
import Relatorio from "../assets/img/Relatorio.svg";
import Sair from "../assets/img/Sair.svg";
import hamburguer from "../assets/img/Hamburguer.svg";

import { Link } from "react-router-dom";

import "../styles/MenuLateral.css";

const MenuLateral = () => {
    const [menu, setMenu] = useState(true);

    const abrirMenu = () => {
        setMenu(!menu);
    }

    return (
        <div className={`menu-lateral ${menu ? '' : 'fechado'}`}>
            <div className="conteiner-superior">
                <img src={Icone} alt="icone" id='icone' />
                <button onClick={abrirMenu}>
                    <img src={hamburguer} alt="menu" />
                </button>
            </div>
            <div className="conteiner-conteudo">
                <ul>
                    <li>
                        <Link to="/inicial">
                            <img src={Inicio} alt="tela inicial" />
                            {menu ? 'Tela Inicial' : ''}
                        </Link>
                    </li>
                    <li>
                        <Link to="">
                            <img src={Campanha} alt="campanha" />
                            {menu ? 'Campanha' : ''}
                        </Link>
                    </li>
                    <li>
                        <Link to="">
                            <img src={Escala} alt="escala" />
                            {menu ? 'Escala' : ''}
                        </Link>
                    </li>
                    <li>
                        <Link to="">
                            <img src={Relatorio} alt="relatorio mensal" />
                            {menu ? 'Relatório Mensal' : ''}
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="conteiner-saida">
                <Link to="/">
                    <img src={Sair} alt="sair" />
                    <span>{menu ? 'Sair' : ''}</span>
                </Link>
            </div>
        </div>
    )
}

export default MenuLateral;