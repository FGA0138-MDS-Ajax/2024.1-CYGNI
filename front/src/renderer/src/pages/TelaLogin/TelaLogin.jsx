import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

//import ImagemLogin from "../assets/img/ParteBrancaLogin.svg";
import Icone from "../../assets/img/IconeAGIS.svg";

import "./TelaLogin.css";

const TelaLogin = () => {
	const navegar = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const aoEnviar = () => {
		navegar("/inicial");
	};

	return (
		<div className="tela-login">
			<div className="imagem-tela-login">
				<h1>EM DESENVOLVIMENTO</h1>
				{/* <img src={ImagemLogin} alt="imagem-login" id='imagem-login' /> */}
			</div>
			<div className="container-login">
				<img src={Icone} alt="icone" id="icon" />
				<h2>Entrar</h2>
				<form className="formulario-login">
					<input
						className={errors?.name && "erro-input"}
						type="text"
						placeholder="Usuário"
						{...register("name", { required: true })}
					/>
					{errors?.name?.type === "required" && <p className="mensagem-erro">Preenchimento obrigatório.</p>}
					<input
						className={errors?.password && "input-error"}
						type="password"
						placeholder="Senha"
						{...register("password", { required: true })}
					/>
					{errors?.password?.type === "required" && <p className="mensagem-erro">Preenchimento obrigatório.</p>}
					<button
						type="submit"
						onClick={(e) => {
							e.preventDefault();
							handleSubmit(aoEnviar)();
						}}
					>
						Login
					</button>
				</form>
				<p>
					Esqueceu a senha? <a href="">Recupere aqui!</a>
				</p>
			</div>
		</div>
	);
};

export default TelaLogin;
