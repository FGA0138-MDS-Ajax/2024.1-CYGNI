import React from "react";
import { DataTable } from '../../components/Tabelas/TabelaRelatorio'
import MenuLateral from "../../components/MenuLateral/MenuLateral";
import "./TelaRelatorio.css";

const TelaRelatorio = () => {
	return (
		<div className="conteiner-relatorio-mensal">
			<MenuLateral />
			<div className="conteiner-relatorio">
				<div className="divisao-titulo-relatorio">
					<h1>Relatórios</h1>
					<p>Visão geral sobre a situação de cada funcionário.</p>
				</div>
				<div className="divisao-tabela-relatorio">
					<DataTable />
				</div>
			</div>
		</div>
	);
};

export default TelaRelatorio;