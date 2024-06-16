import React from "react";
import Botao from "../../components/Botao/Botao.jsx";
import { useNavigate } from "react-router-dom";
import Icone from "../../assets/img/IconeAGIS.svg";
import "./TelaRedefinicao.css";

import { useForm } from "react-hook-form";
import { HiArrowUturnLeft } from "react-icons/hi2";

const TelaRedefinicao = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navegar = useNavigate();

  const aoEnviar = () => {
    navegar("/");
  };

  

  const senha = watch("senha");

  return (
    <div className="container-redefinicao">
      <div className="botao-voltar">
        <Botao
          id="voltar"
          icone={<HiArrowUturnLeft size={20} style={{ marginRight: "5px" }} />}
          texto="Voltar"
          cor="#032026"
          largura={"130px"}
          aoClicar={() => {
            navegar("/tela-recuperacao");
          }}
        />
      </div>
      <div className="formulario">
        <img id='img-icone' src={Icone} alt="icone" />
        <h1>Redefinir senha</h1>
        <form className="formulario-senha" onSubmit={handleSubmit(aoEnviar)}>
          <input
            type="password" id="senha" placeholder="Digite a nova senha"
            {...register("senha", { required: "Este campo é obrigatório" })} />
          {errors.senha && <p className="mensagem-erro">{errors.senha.message}</p>}
          <input type="password" id="confirmarSenha"
            {...register("confirmarSenha", { required: "Confirmação de senha é obrigatória", validate: value => value === senha || "As senhas não coincidem" })}
            placeholder="Digite novamente a senha" />
          {errors.confirmarSenha && <p className="mensagem-erro">{errors.confirmarSenha.message}</p>}
        </form>
        <Botao id='botao-red' largura={'26%'} cor={'#FFA800'} corTexto={'#032026'} texto={'Recuperar'}
          aoClicar={(e) => {
            e.preventDefault();
            handleSubmit(aoEnviar)();
          }}
        />
      </div>



    </div>
  );
};
export default TelaRedefinicao; 