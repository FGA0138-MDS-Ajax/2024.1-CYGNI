import React from "react";
import { DataTable } from '../../components/TabelaRelatorio/Tabela'
import MenuLateral from "../../components/MenuLateral/MenuLateral";
import "./TelaRelatorio.css";

const TelaRelatorio = () => {
	return (
		<div className="conteiner-relatorio-mensal">
			<MenuLateral />
			<div className="conteiner-relatorio">
				<DataTable />
			</div>
		</div>
	);
};

export default TelaRelatorio;