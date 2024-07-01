import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../services/api.jsx";
import { debounce } from 'lodash';

import MenuLateral from "../../components/MenuLateral/MenuLateral.jsx";
import ModalPerfil from "../../components/ModalPerfil/ModalPerfil.jsx";

import ImagemTelaInicial from "../../assets/img/imagem-tela-inicial.svg"
import TextoTelaInicial from "../../assets/img/texto-imagem-inicial.svg"
import Botao from "../../components/Botao/Botao.jsx"

import { FaSearch } from "react-icons/fa";
import { FiArrowUpCircle } from "react-icons/fi";
import { FiArrowRightCircle } from "react-icons/fi";

import "./TelaInicial.css";
import { jwtDecode } from "jwt-decode";

const TelaInicial = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [privilegio, setPrivilegio] = useState(false);
	const [funcionarios, setFuncionarios] = useState([]);
	const [pesquisa, setPesquisa] = useState("");
	const navegar = useNavigate();

	useEffect(() => {
		const fetchFuncionarios = async () => {
			const response = await api.buscarUsuarios();
			setFuncionarios(response.data);
		};
		fetchFuncionarios();

		const token = localStorage.getItem("token");
		if (token) {
			try {
				const decodificado = jwtDecode(token);
				setPrivilegio(decodificado.privilegios);
			} catch (error) {
				console.error("erro ao decodificar token:", error);
			}
		}
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

	const openModal = () => {
		setIsModalOpen(true);
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
						<FaSearch size={25} className="icone-pesquisa" color="#777777" />
						<input type="text" placeholder="Pesquise por matrícula ou nome do funcionário..." onChange={(e) => handleSearch(e.target.value)} />
						<div className="lista-funcionarios">
							{funcionariosFiltrados.map((funcionario) => (
								<ul key={funcionario._id} className="funcionario-item" onClick={() => handleFuncionarioSelecionado(funcionario)}>
									<li>{`${funcionario.matricula} | ${funcionario.nomeCompleto}`}</li>
								</ul>
							))}
						</div>
					</div>
					<h4>Boas-vindas, usuario!</h4>
				</div>
				<div className="div-inferior">
					<div className="div-inferior-esquerda">
						<img src={TextoTelaInicial} alt="texto-tela-inicial" />
						<div className="div-inferior-botoes">
							{privilegio && (
								<Botao
									texto="Cadastrar Funcionário"
									icone={<FiArrowRightCircle size={20} style={{ marginRight: "5px" }} />}
									cor="#fff"
									corTexto="#032026"
									largura={"30%"}
									aoClicar={irParaTelaCadastro}
								/>
							)}
							{privilegio && (
								<Botao
									texto="Cadastrar Administrador"
									icone={<FiArrowUpCircle size={20} style={{ marginRight: "5px" }} />}
									cor="#fff"
									corTexto="#032026"
									largura={"30%"}
									aoClicar={openModal}
								/>
							)}
							<div className="modal-none">
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
					<div className="div-inferior-direita">
						<img src={ImagemTelaInicial} alt="imagem-tela-inicial" />
					</div>
				</div>
			</div >
		</div >
	);
};

export default TelaInicial;
