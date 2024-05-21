import React from 'react';
import '../styles/TelaLogin.css';
import ImagemLogin from "../assets/img/ParteBrancaLogin.svg";
import Icone from "../assets/img/IconeAGIS.svg";

const TelaLogin = () => {
  return (
    <div className="tela-login">
      <div className="tela-login-img">
        <img src={ImagemLogin} alt="imagem-login" id='imagem-login'/>
      </div>
      <div className="container-login">
        <img src={Icone} alt="icone" id='icone' />
        <div className="container-formulario">
          <h2>Entrar</h2>
          <form className="formulario-login">
            <span>Usuário</span>
            <input type="text" required/>
            <span>Senha</span>
            <input type="password" required/>
            <button type="submit">Login</button>
          </form>
        </div>
        <p>Esqueceu a senha? <a href="">Recupere aqui</a></p>
      </div>
    </div >
  );
};

export default TelaLogin;

