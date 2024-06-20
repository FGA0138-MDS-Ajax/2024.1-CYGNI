import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as api from "../../services/api.jsx";
import Alert from "../../components/Alerta/Alerta.jsx"; // Importe o componente de alerta
import Icone from "../../assets/img/IconeAGIS.svg";
import ImagemOficial from "../../assets/img/oficial-imagem-login.svg";
import "./TelaLogin.css";

const TelaLogin = () => {
	const [formData, setFormData] = useState({
		login: "",
		senha: "",
	});
	const [alert, setAlert] = useState(null); // Estado para o alerta

	const lidarComMudancaNoInput = ({ target }) => {
		setFormData({ ...formData, [target.name]: target.value });
	};

	const navegar = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const aoEnviar = () => {
		navegar("/inicial");
	};

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
						className={errors?.name && "erro-input"}
						type="text"
						placeholder="Usuário"
						name="login"
						{...register("login", { required: true })}
						onChange={(e) => lidarComMudancaNoInput(e)}
					/>
					{errors?.name?.type === "required" && <p className="mensagem-erro">Preenchimento obrigatório.</p>}
					<input
						className={errors?.password && "input-error"}
						type="password"
						name="senha"
						placeholder="Senha"
						{...register("senha", { required: true })}
						onChange={(e) => lidarComMudancaNoInput(e)}
					/>
					{errors?.password?.type === "required" && <p className="mensagem-erro">Preenchimento obrigatório.</p>}
					<button
						type="submit"
						onClick={async (e) => {
							e.preventDefault();
							try {
								const resposta = await api.login(formData);
								localStorage.setItem("token", resposta.data);
								setAlert({ type: "success", message: "Login realizado com sucesso!" });
								setTimeout(() => {
									handleSubmit(aoEnviar)();
								}, 1000);
							} catch (error) {
								const errorMessage =
									error.response && error.response.data && error.response.data.message
										? error.response.data.message
										: error.message;
								setAlert({ type: "error", message: `Erro ao realizar login: ${errorMessage}` });
								// <Alert type={"error"} message={`Erro ao realizar login: ${errorMessage}`} />;
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
							navegar("/tela-recuperacao");
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
