import React from 'react';
import '../styles/TelaLogin.css';
import ImagemLogin from "../assets/img/ParteBrancaLogin.svg";
import Icone from "../assets/img/IconeAGIS.svg";
import { useForm } from "react-hook-form"

const TelaLogin = () => {

  const {
    register, 
    handleSubmit, 
    formState: { errors}  
  } = useForm ();

  const onSubmit = (data) => {
    console.log(data);
  };

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
            <input 
            className={errors?.name && "input-error"}
            type="text" 
            placeholder="Usuário"
            {...register("name", {required:true} )}/>
            {errors?.name?.type === "required" && (<p className="error-message">
              Necessário usuário.
              </p>)}

            <input 
            className={errors?.password && "input-error"}
            type="password" 
            placeholder="Senha"
            {...register("password", {required:true} )} />
              {errors?.password?.type === "required" && (<p className="error-message">
              Necessário senha.
              </p>)}

            <button onClick={() => handleSubmit(onSubmit)()} >Login</button>
          </form>

        </div>

        <p>Esqueceu a senha? <a href="">Recupere aqui</a></p>

      </div>
    </div >
  );
};

export default TelaLogin;

