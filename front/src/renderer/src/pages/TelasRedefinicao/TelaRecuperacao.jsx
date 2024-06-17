import React, { useContext, useState } from "react";
import Botao from "../../components/Botao/Botao.jsx";
import { useNavigate } from "react-router-dom";
import Icone from "../../assets/img/IconeAGIS.svg";
import "./TelaRecuperacao.css";
import { HiArrowUturnLeft } from "react-icons/hi2";
import * as api from "../../services/api.jsx";
import { RedefinicaoContext } from "./redefinicaoContext.jsx";

const TelaRecuperacao = () => {

  const navegar = useNavigate();

  const {email, setEmail, token, setToken} = useContext(RedefinicaoContext);

  const lidarComMudancaNoInputEmail = (e) => {
    setEmail(e.target.value);
  }

  const lidarComMudancaNoInputToken = (e) => {
    setToken(e.target.value);
  }

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
        <input type="email" name="email" id="" placeholder="Digite o seu e-mail"
          onChange={(e) => lidarComMudancaNoInputEmail(e)}
        />
        <Botao id='botao-rec' largura={'26.5%'} cor={'#FFA800'} corTexto={'#032026'} texto={'Enviar'} 
          aoClicar={async (e) => {
            e.preventDefault()
            try {
              await api.enviarEmailDeRedefinicao({email: email});
            } catch (error) {
              alert(error)
            }
          }}
        />
        <div className="container-verificacao">
          <input type="text" name="token" id="" placeholder="Digite o código de recuperação"
            onChange={(e) => lidarComMudancaNoInputToken(e)}
          />
          <Botao id='botao-val' largura={'20%'} cor={'#FFA800'} corTexto={'#032026'} texto={'Verificar'}
            aoClicar={async (e) => {
              e.preventDefault();
              try {
                alert(email);
                await api.verificaToken({token: token, email: email})
                navegar('/tela-redefinicao');
              } catch (error) {
                alert(error);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default TelaRecuperacao; 