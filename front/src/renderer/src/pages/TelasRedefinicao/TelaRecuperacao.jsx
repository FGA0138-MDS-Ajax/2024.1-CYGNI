import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../../components/Alerta/Alerta.jsx";
import { RedefinicaoContext } from "./redefinicaoContext.jsx";
import { HiArrowUturnLeft } from "react-icons/hi2";
import Botao from "../../components/Botao/Botao.jsx";
import Icone from "../../assets/img/IconeAGIS.svg";

import * as api from "../../services/api.jsx";
import "./TelaRecuperacao.css";

const TelaRecuperacao = () => {
	const navegar = useNavigate();

	const { email, setEmail, token, setToken } = useContext(RedefinicaoContext);
	const [alert, setAlert] = useState(null); // Estado para o alerta

	const lidarComMudancaNoInputEmail = (e) => {
		setEmail(e.target.value);
	};

	const lidarComMudancaNoInputToken = (e) => {
		setToken(e.target.value);
	};

	const handleCloseAlert = () => {
		setAlert(null);
	};

	return (
		<div className="container-recuperacao">
			<div className="botao-voltar">
				<Botao
					id="voltar"
					icone={<HiArrowUturnLeft size={20} style={{ marginRight: "5px" }} />}
					texto="Voltar"
					cor="#03161A"
					corTexto="#fff"
					largura={"130px"}
					aoClicar={() => {
						navegar("/");
					}}
				/>
			</div>
			<div className="conteiner-campos">
				<img src={Icone} alt="icone" />
				<h1>Recuperação de senha</h1>
				<div className="conteiner-email">
					<input
						type="email"
						name="email"
						id=""
						placeholder="Digite o seu e-mail"
						onChange={(e) => lidarComMudancaNoInputEmail(e)}
					/>
					<Botao
						className="botao-rec"
						id="botao-rec"
						largura={"45%"}
						cor={"#fff"}
						corTexto={"#032026"}
						texto={"Enviar"}
						aoClicar={async (e) => {
							e.preventDefault();
							try {
								await api.enviarEmailDeRedefinicao({ email: email });
								setAlert({ type: "success", message: "Verifique seu email!" });
							} catch (error) {
								const errorMessage =
									error.response?.data?.message || error.message;
								setAlert({ type: "error", message: `Email inválido: ${errorMessage}` });
							}
						}}
					/>
				</div>
				<div className="container-verificacao">
					<input
						type="text"
						name="token"
						id=""
						placeholder="Digite o código de recuperação"
						onChange={(e) => lidarComMudancaNoInputToken(e)}
					/>
					<Botao
						id="botao-val"
						largura={"10%"}
						cor={"#fff"}
						corTexto="#032026"
						texto={"Verificar"}
						aoClicar={async (e) => {
							e.preventDefault();
							try {
								await api.verificaToken({ token: token, email: email });
								setTimeout(() => {
									navegar("/tela-redefinicao");
								}, 1000);
							} catch (error) {
								const errorMessage =
									error.response?.data?.message || error.message;
								setAlert({ type: "error", message: `Token inválido: ${errorMessage}` });
							}
						}}
					/>
				</div>
			</div>
			{alert && <Alert message={alert.message} type={alert.type} onClose={handleCloseAlert} />}
		</div>
	);
};

export default TelaRecuperacao;
