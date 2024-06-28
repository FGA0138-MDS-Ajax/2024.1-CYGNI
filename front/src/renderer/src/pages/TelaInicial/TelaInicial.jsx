import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../services/api.jsx";
import { debounce } from 'lodash';

import MenuLateral from "../../components/MenuLateral/MenuLateral.jsx";
import ModalPerfil from "../../components/ModalPerfil/ModalPerfil.jsx";

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
import { set } from "react-hook-form";

const TelaInicial = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [funcionarios, setFuncionarios] = useState([]);
	const [pesquisa, setPesquisa] = useState("");
	const navegar = useNavigate();

	useEffect(() => {
		const fetchFuncionarios = async () => {
			const response = await api.buscarUsuarios();
			setFuncionarios(response.data);
		};
		fetchFuncionarios();
	}, []);

	const handleSearch = debounce((searchTerm) => {
		setPesquisa(searchTerm);
	}, 300);

	const funcionariosFiltrados = pesquisa.trim() ? funcionarios.filter(funcionario =>
		funcionario.nomeCompleto.toLowerCase().includes(pesquisa.toLowerCase()) ||
		funcionario.matricula.includes(pesquisa)
	) : [];

	const handleFuncionarioSelecionado = (funcionario) => {
		navegar('/tela-cadastro', { state: { funcionario } });
	}

	const irParaTelaCadastro = () => {
		navegar("/tela-cadastro");
	};

	const closeModal = () => {
    setIsModalOpen(false);
  }

	return (
		<div className="tela-inicial">
			<MenuLateral />
			<div className="conteiner-inicial">
				<div className="div-superior">
					<div className="barra-de-pesquisa">
						<FaSearch size={24} className="icone-pesquisa" color="#777777" />
						<input type="text" placeholder="Pesquise por matrícula ou nome do funcionário..." onChange={(e) => handleSearch(e.target.value)} />
						<div className="lista-funcionarios">
							{funcionariosFiltrados.map((funcionario) => (
								<ul key={funcionario._id} className="funcionario-item" onClick={() => handleFuncionarioSelecionado(funcionario)}>
									<li>{`${funcionario.matricula} | ${funcionario.nomeCompleto}`}</li>
								</ul>
							))}
						</div>
					</div>
					<button type="button" onClick={irParaTelaCadastro}>
						<FiUserPlus size={20} style={{ marginRight: "8px" }} />
						<span>Cadastrar</span>
					</button>
				</div>
				<div className="div-inferior">
					<h1>Principais Funcionalidades</h1>
					<div className="cartoes-definicoes">
						<div className="div-nova">
							<FiUserPlus size={20} style={{ marginRight: "8px" }} />
							<span>Cadastrar</span>
						</div>
						<div className="cartoes-conteiner">
							<div className="titulo-cartoes">
								<FiUsers size={22} color="#FFA800" style={{ marginRight: "8px" }} />
								<h2>Registro Eficiente</h2>
							</div>
							<p>Controle sobre campos específicos de registro do usuário e experiência de cadastro eficiente. </p>
						</div>
					</div>
					<div className="cartoes-definicoes">
						<div className="div-nova">
							<FiUserX size={20} style={{ marginRight: "8px" }} />
							<span>Afastamento</span>
						</div>
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
						<div className="div-nova">
							<FiCalendar size={20} style={{ marginRight: "8px" }} />
							<span>Campanha</span>
						</div>
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
						<div className="div-nova">
							<FiClipboard size={20} style={{ marginRight: "8px" }} />
							<span>Relatório</span>
						</div>
						<div className="cartoes-conteiner">
							<div className="titulo-cartoes">
								<FiFile size={22} color="#FFA800" style={{ marginRight: "8px" }} />
								<h2>Desempenho Organizacional</h2>
							</div>
							<p>Acompanhamento detalhado dos resultados mensais, proporcionando agilidade na gestão dos dados.</p>
						</div>
					</div>
					<div className="cadastro-perfil">
						<ModalPerfil
							open={isModalOpen}
							admin={false}
							isEdit={false}
							closeModal={closeModal}
							setIsModalOpen={setIsModalOpen}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TelaInicial;
