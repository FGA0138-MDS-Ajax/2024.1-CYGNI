import React from "react";
import { useForm } from "react-hook-form";

import MenuSuspenso from "../../components/MenuSuspenso/MenuSuspenso";
import MenuLateral from "../../components/MenuLateral/MenuLateral";


import "./TelaRelatorio.css";
import { DataTable } from '../../components/TabelaRelatorio/Tabela'
import {DateCalendarServerRequest} from '../../components/calendario/calendario.jsx'


const TelaRelatorio = () => {
	const {
		register,
		handleSubmit,
		trigger,
		formState: { errors },
	} = useForm();

	return (
		<div className="conteiner-relatorio-mensal">
			<MenuLateral />

			<div className="conteiner-relatorio">
				<DataTable/>
			</div>
		</div>
	);
};

export default TelaRelatorio;