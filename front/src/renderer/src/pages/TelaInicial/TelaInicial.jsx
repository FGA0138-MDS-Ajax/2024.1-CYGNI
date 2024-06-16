import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import MenuLateral from "../../components/MenuLateral/MenuLateral.jsx";

import { FiUserPlus } from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import { FiUsers } from "react-icons/fi";
import { FiUserX } from "react-icons/fi";
import { FiAlertCircle } from "react-icons/fi";
import { FiCreditCard } from "react-icons/fi";
import { FiCalendar } from "react-icons/fi";
import { FiFile } from "react-icons/fi";
import { FiClipboard } from "react-icons/fi";

import "./TelaInicial.css";

const TelaInicial = () => {
	const navigate = useNavigate();

	const irParaTelaCadastro = () => {
		navigate("/tela-cadastro");
	};

	return (
		<div className="tela-inicial">
			<MenuLateral />
			<div className="conteiner-inicial">
				<div className="div-superior">
					<div className="barra-de-pesquisa">
						<FaSearch size={24} className="icone-pesquisa" color="#777777" />
						<input type="text" placeholder="Pesquise por matrícula ou nome do funcionário..." />
					</div>
					<button type="button" onClick={irParaTelaCadastro}>
						<FiUserPlus size={20} style={{ marginRight: "8px" }} />
						<span>Cadastrar</span>
					</button>
				</div>
				<div className="div-inferior">
					<h1>Principais Funcionalidades</h1>
					<div className="cartoes-definicoes">
						<button>
							<FiUserPlus size={20} style={{ marginRight: "8px" }} />
							<span>Cadastrar</span>
						</button>
						<div className="cartoes-conteiner">
							<div className="titulo-cartoes">
								<FiUsers size={22} color="#FFA800" style={{ marginRight: "8px" }} />
								<h2>Registro Eficiente</h2>
							</div>
							<p>Controle sobre campos específicos de registro do usuário e experiência de cadastro eficiente. </p>
						</div>
					</div>
					<div className="cartoes-definicoes">
						<button>
							<FiUserX size={20} style={{ marginRight: "8px" }} />
							<span>Afastamento</span>
						</button>
						<div className="cartoes-conteiner">
							<div className="titulo-cartoes">
								<FiAlertCircle size={22} color="#FFA800" style={{ marginRight: "8px" }} />
								<h2>Gerência Detalhada</h2>
							</div>
							<p>
								Administração das licenças e organização interna, proporcionando facilidade no acompanhamento de cada
								caso.
							</p>
						</div>
					</div>
					<div className="cartoes-definicoes">
						<button>
							<FiCalendar size={20} style={{ marginRight: "8px" }} />
							<span>Campanha</span>
						</button>
						<div className="cartoes-conteiner">
							<div className="titulo-cartoes">
								<FiCreditCard size={22} color="#FFA800" style={{ marginRight: "8px" }} />
								<h2>Abordagem Intuitiva</h2>
							</div>
							<p>
								Planejamento, monitoramento e administração de campanhas facilitando a gestão de cada ciclo e a
								colaboração da equipe.
							</p>
						</div>
					</div>
					<div className="cartoes-definicoes">
						<button>
							<FiClipboard size={20} style={{ marginRight: "8px" }} />
							<span>Relatório</span>
						</button>
						<div className="cartoes-conteiner">
							<div className="titulo-cartoes">
								<FiFile size={22} color="#FFA800" style={{ marginRight: "8px" }} />
								<h2>Desempenho Organizacional</h2>
							</div>
							<p>Acompanhamento detalhado dos resultados mensais, proporcionando agilidade na gestão dos dados.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TelaInicial;
