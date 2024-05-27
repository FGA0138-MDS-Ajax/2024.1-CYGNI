import React from "react";
import MenuLateral from "../components/MenuLateral.jsx";
import '../styles/TelaCadastro.css';

const TelaCadastro = () => {
  return (
    <div className="tela-cadastro">
      <MenuLateral />
      <div className="cadastro-geral">
        <h3>Cadastro geral</h3>
        <form className="formulario-login">
          <span>Matrícula</span>
          <input type="text" />
          <span>Nome Completo</span>
          <input type="text" />
          <span>Sexo</span>
          <input type="text" />
          <span>Nome de Guerra</span>
          <input type="text" />
          <span>Nascimento</span>
          <input type="text" />
          <span>Tipo Sanguíneo</span>
          <input type="text" />
          <span>Nome da Mãe</span>
          <input type="text" />
          <span>Nome do Pai</span>
          <input type="text" />
          <span>Email</span>
          <input type="text" />
          <span>Telefone</span>
          <input type="text" />
          <span>Posto/Grad.</span>
          <input type="text" />
          <span>Escolaridade</span>
          <input type="text" />
          <span>Estado Civil</span>
          <input type="text" />
        </form>
      </div>

    </div >

  )
};

export default TelaCadastro;