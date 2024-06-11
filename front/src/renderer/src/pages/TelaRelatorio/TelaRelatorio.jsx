import React from "react";
import { useForm } from "react-hook-form";

import MenuSuspenso from "../../components/MenuSuspenso/MenuSuspenso";
import MenuLateral from "../../components/MenuLateral/MenuLateral";

import "./TelaRelatorio.css";

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
			<div className="conteiner-conteudo-principal">
				<div className="filtros">
					{/* <Campo id="ano" texto="Ano" tipo="text" registro={register} erros={errors} /> */}
					<MenuSuspenso
						id="ano"
						texto="Ano"
						largura="190px"
						opcoes={[
							"2024",
							"2025",
							"2026",
							"2027",
							"2028",
							"2029",
							"2030",
							"2031",
							"2032",
							"2033",
							"2034",
							"2035",
							"2036",
							"2037",
							"2038",
							"2039",
							"2040",
							"2041",
							"2042",
							"2043",
							"2044",
							"2045",
							"2046",
							"2047",
							"2048",
							"2049",
							"2050",
						]}
					/>
					<MenuSuspenso
						id="mes"
						texto="Mês"
						largura="190px"
						opcoes={[
							"Janeiro",
							"Fevereiro",
							"Março",
							"Abril",
							"Maio",
							"Junho",
							"Julho",
							"Agosto",
							"Setembro",
							"Outubro",
							"Novembro",
							"Dezembro",
						]}
					/>
					<MenuSuspenso
						id="situacao"
						texto="Situação"
						largura="190px"
						opcoes={[
							"Abono",
							"LTSP",
							"Férias",
							"LTIP",
							"LTSPF",
							"Núpcias",
							"Licença Paternidade",
							"Dispensa Recompensa",
							"Restrição Médica",
							"Recesso Final de Ano",
							"Atestado de Comparecimento",
							"Atestado de Acompanhamento",
							"Outros",
						]}
					/>
					<MenuSuspenso id="ordem" texto="Ordem" largura="190px" opcoes={["A-Z", "Z-A"]} />
				</div>
				<div className="conteiner-relatorio">
					<h2>LISTA DE FUNCIONÁRIOS FILTRADOS</h2>
				</div>
			</div>
		</div>
	);
};

export default TelaRelatorio;
