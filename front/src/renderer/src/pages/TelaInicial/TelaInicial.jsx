import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import MenuLateral from "../../components/MenuLateral/MenuLateral.jsx";
import Botao from "../../components/Botao/Botao.jsx";

import busca from "../../assets/img/busca.svg";
import seta from "../../assets/img/setinha.svg";

import "./TelaInicial.css";

const TelaInicial = () => {
	const navegar = useNavigate();
	const [selecionado, setSelecionado] = useState("Nome");
	const [aberto, setAberto] = useState(false);

	const selecionarItem = (item) => {
		setSelecionado(item);
		setAberto(false);
	};

	const alternarSuspensao = () => {
		setAberto(!aberto);
	};

	const irParaCadastro = () => {
		navegar("/tela-cadastro");
	};

	return (
		<div className="tela-inicial">
			<MenuLateral />
			<div className="conteiner-cabecalho">
				<form>
					<div className="busca">
						<div className="lista-suspensa" onClick={alternarSuspensao}>
							<span>{selecionado}</span>
							<img src={seta} alt="seta" />

							<ul className="opcoes-lista-suspensa" style={{ display: aberto ? "block" : "none" }}>
								<li onClick={() => selecionarItem("Nome")}>Nome</li>
								<li onClick={() => selecionarItem("Matrícula")}>Matrícula</li>
							</ul>
						</div>

						<input type="search" placeholder="Buscar..." />
						<img src={busca} alt="buscar" id="busca-icone" />
					</div>
				</form>
				<Botao texto="Cadastrar Ficha" aoClicar={irParaCadastro} />
			</div>
		</div>
	);
};

export default TelaInicial;
