import React, { useState } from "react";
import Botao from "../../components/Botao/Botao.jsx";
import { useNavigate } from "react-router-dom";
import Icone from "../../assets/img/IconeAGIS.svg";
import "./TelaRecuperacao.css";
import { HiArrowUturnLeft } from "react-icons/hi2";

const TelaRecuperacao = () => {

  const navegar = useNavigate();

  return (

    <div className="container-recuperacao">
      <div className="botao-voltar">
        <Botao
          id="voltar"
          icone={<HiArrowUturnLeft size={20} style={{ marginRight: "5px" }} />}
          texto="Voltar"
          cor="#032026"
          largura={"130px"}
          aoClicar={() => {
            navegar("/");
          }}
        />
      </div>
      <div className="formulario">
        <img id='img-icone' src={Icone} alt="icone" />
        <h1>Recuperação de senha</h1>
        <input type="email" name="" id="" placeholder="Digite o seu e-mail" />
        <Botao id='botao-rec' largura={'26.5%'} cor={'#FFA800'} corTexto={'#032026'} texto={'Enviar'} />
        <div className="container-verificacao">
          <input type="text" name="" id="" placeholder="Digite o código de recuperação" />
          <Botao id='botao-val' largura={'20%'} cor={'#FFA800'} corTexto={'#032026'} texto={'Verificar'}
            aoClicar={(e) => {
              e.preventDefault();
              navegar('/tela-redefinicao');
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default TelaRecuperacao; 