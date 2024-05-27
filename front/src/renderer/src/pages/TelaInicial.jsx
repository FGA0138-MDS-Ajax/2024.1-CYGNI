import React, { useState } from "react";
import MenuLateral from "../components/MenuLateral.jsx";
import busca from "../assets/img/busca.svg";
import { useNavigate } from 'react-router-dom';
import '../styles/TelaInicial.css';
import seta from "../assets/img/setinha.svg";

const TelaInicial = () => {
  const nav = useNavigate();
  const [selecionado, setSelecionado] = useState('Nome');
  const [aberto, setAberto] = useState(false);

  const selecionarItem = (item) => {
    setSelecionado(item);
    setAberto(false);
  }

  const alternarSuspensao = () => {
    setAberto(!aberto);
  }

  const irParaCadastro = () => {
    nav('/tela-cadastro');
  };

  return (
    <div className="tela-inicial">
      <MenuLateral />
      <div className="conteiner-header">
        <form>
          <div className="busca">
            <div className="suspensa" onClick={alternarSuspensao}>
                <span>{selecionado}</span>
                <img src={seta} alt="seta"/>

              <ul className="lista-suspensa" style={{ display: aberto ? 'block' : 'none' }}>
                <li onClick={() => selecionarItem('Nome')}>Nome</li>
                <li onClick={() => selecionarItem('Matrícula')}>Matrícula</li>
              </ul>
            </div>

            <input type="search" placeholder="Buscar..." />
            <img src={busca} alt="buscar" id='busca-icone'/>
          </div>
        </form>
        <button onClick={irParaCadastro}>Cadastrar Ficha</button>
      </div>
      <div>
        
      </div>
    </div>
  );
};

export default TelaInicial;