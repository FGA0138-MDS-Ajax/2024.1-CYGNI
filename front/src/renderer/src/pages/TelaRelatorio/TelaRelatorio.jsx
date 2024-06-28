import React from "react";
import { DataTable } from '../../components/Tabelas/TabelaRelatorio'
import MenuLateral from "../../components/MenuLateral/MenuLateral";
import "./TelaRelatorio.css";
import { DataTable } from '../../components/TabelaRelatorio/Tabela'
import {DateCalendarServerRequest} from '../../components/calendario/calendario.jsx'

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