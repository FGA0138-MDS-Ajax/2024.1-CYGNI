import React, { useContext, useState } from "react";
import Botao from "../../components/Botao/Botao.jsx";
import { useNavigate } from "react-router-dom";
import Icone from "../../assets/img/IconeAGIS.svg";
import "./TelaRedefinicao.css";
import Alert from "../../components/Alerta/Alerta.jsx"; // Importe o componente de alerta
import * as api from "../../services/api.jsx";
import { useForm } from "react-hook-form";
import { HiArrowUturnLeft } from "react-icons/hi2";
import { RedefinicaoContext } from "./redefinicaoContext.jsx";

const TelaRedefinicao = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navegar = useNavigate();
  const [alert, setAlert] = useState(null); // Estado para o alerta
  const [formData, setFormData] = useState({
    novaSenha: "",
    novaSenhaConfirmacao: ""
  })

  const handleCloseAlert = () => {
    setAlert(null);
  };

  function lidarComMudancaNoInput({ target }) {
    setFormData({ ...formData, [target.name]: target.value });
  }

  const { email, token } = useContext(RedefinicaoContext);

  const aoEnviar = () => {
    navegar("/");
  };

  const aoVoltar = () => {
    navegar("/tela-recuperacao");
  };

  const senha = watch("senha");

  return (
    <div className="container-redefinicao">
      <div className="botao-voltar">
        <Botao
          id="voltar"
          icone={<HiArrowUturnLeft size={20} style={{ marginRight: "5px" }} />}
          texto="Voltar"
          cor="#03161A"
          corTexto="#fff"
          largura={"130px"}
          aoClicar={() => {
            navegar("/tela-recuperacao");
          }}
        />
      </div>
      <div className="conteiner-campos2">
        <img src={Icone} alt="icone" />
        <h1>Redefinir senha</h1>
        <div className="conteiner-senha">
          <form className="formulario-senha" onSubmit={handleSubmit(aoEnviar)}>
            <input
              type="password"
              id="senha"
              placeholder="Digite a nova senha"
              {...register("senha", { required: true })}
              onChange={(e) => lidarComMudancaNoInput(e)}
              name="novaSenha"
            />
            {errors?.senha?.type === "required" && <p className="mensagem-erro">Preenchimento obrigatório.</p>}
            <input
              type="password"
              id="confirmarSenha"
              {...register("confirmarSenha", { required: true, validate: value => value === senha || "As senhas não coincidem" })}
              placeholder="Digite novamente a senha"
              onChange={(e) => lidarComMudancaNoInput(e)}
              name="novaSenhaConfirmacao"
            />
            {errors?.password?.type === "required" && <p className="mensagem-erro">{errors.confirmarSenha.message}</p>}
          </form>
        </div>
        <div className="conteiner-botao-redefinir">
          <Botao id='botao-red' largura={'45%'} cor={'#fff'} corTexto={'#032026'} texto={'Recuperar'}
            aoClicar={async (e) => {
              e.preventDefault();
              try {
                const payload = {
                  email: email,
                  novaSenha: formData.novaSenha,
                  novaSenhaConfirmacao: formData.novaSenhaConfirmacao,
                  token: token
                }
                await api.redefineSenha(payload);
                setAlert({ type: "success", message: "Senha alterada com sucesso!" });
                setTimeout(() => {
                  navegar("/");
                }, 1000);
              } catch (error) {
                const errorMessage =
                  error.response && error.response.data && error.response.data.message
                    ? error.response.data.message
                    : error.message;
                setAlert({ type: "error", message: `Erro ao alterar a senha: ${errorMessage}` });
              }
            }}
          />
        </div>
      </div>
      {alert && <Alert message={alert.message} type={alert.type} onClose={handleCloseAlert} />}
    </div>
  );
};
export default TelaRedefinicao; 