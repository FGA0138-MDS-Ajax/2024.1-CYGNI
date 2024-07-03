import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as api from "../../services/api.jsx";
import Alert from "../../components/Alerta/Alerta.jsx";
import Icone from "../../assets/img/IconeAGIS.svg";
import ImagemOficial from "../../assets/img/oficial-imagem-login.svg";
import "./TelaLogin.css";

const TelaLogin = () => {
	// Estados locais
	const [disabled, setDisabled] = useState(false); // Estado para controlar se o botão está desabilitado
	const [formData, setFormData] = useState({
		login: "",
		senha: "",
	}); // Estado para armazenar dados do formulário
	const [alert, setAlert] = useState(null); // Estado para controlar a exibição de alertas

	// Função para lidar com mudanças nos campos de entrada
	const lidarComMudancaNoInput = ({ target }) => {
		setFormData({ ...formData, [target.name]: target.value });
	};

	const navegar = useNavigate(); // Hook para navegação
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm(); // Hook para gerenciar o formulário

	// Função chamada ao enviar o formulário
	const aoEnviar = () => {
		navegar("/inicial");
	};

	// Função para fechar o alerta
	const handleCloseAlert = () => {
		setAlert(null);
	};

	return (
		<div className="tela-login">
			<div className="imagem-tela-login">
				<img src={ImagemOficial} alt="imagem-oficial" />
			</div>
			<div className="container-login">
				<img src={Icone} alt="icone" id="icon" />

				<form className="formulario-login">
					<h2>Entrar</h2>
					<input
						className={errors?.login && "erro-input"}
						type="text"
						placeholder="Usuário"
						name="login"
						{...register("login", { required: true })}
						onChange={(e) => lidarComMudancaNoInput(e)}
					/>
					{errors?.login?.type === "required" && <p className="mensagem-erro">Preenchimento obrigatório.</p>}
					<input
						className={errors?.senha && "erro-input"}
						type="password"
						name="senha"
						placeholder="Senha"
						{...register("senha", { required: true })}
						onChange={(e) => lidarComMudancaNoInput(e)}
					/>
					{errors?.senha?.type === "required" && <p className="mensagem-erro">Preenchimento obrigatório.</p>}
					<button
						disabled={disabled} // Desabilita o botão se o estado disabled for true
						type="submit"
						onClick={async (e) => {
							e.preventDefault();
							setDisabled(true);
							try {
								const resposta = await api.login(formData); // Chama a função de login da API
								localStorage.setItem("token", resposta.data); // Armazena o token no localStorage
								setAlert({ type: "success", message: "Login realizado com sucesso!" }); // Exibe mensagem de sucesso
								setTimeout(() => {
									handleSubmit(aoEnviar)();
								}, 1000);
								setDisabled(false);
							} catch (error) {
								setDisabled(false);
								const errorMessage =
									error?.response?.data?.message || error.message;
								setAlert({ type: "error", message: `Erro ao realizar login: ${errorMessage}` }); // Exibe mensagem de erro
							}
						}}
					>
						Login
					</button>
				</form>
				<p>
					Esqueceu a senha?{" "}
					<a
						href=""
						onClick={(e) => {
							e.preventDefault();
							navegar("/tela-recuperacao"); // Navega para a página de recuperação de senha
						}}
					>
						Recupere aqui!
					</a>
				</p>
			</div>
			{alert && <Alert message={alert.message} type={alert.type} onClose={handleCloseAlert} />}
		</div>
	);
};

export default TelaLogin;
