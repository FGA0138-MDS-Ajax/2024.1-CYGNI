import React, { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

// Função para formatar data no formato DD/MM/AAAA
const formatarData = (dataISO) => {
	const data = new Date(dataISO);
	const dia = data.getUTCDate().toString().padStart(2, "0");
	const mes = (data.getUTCMonth() + 1).toString().padStart(2, "0");
	const ano = data.getUTCFullYear();
	return `${dia}/${mes}/${ano}`;
};

// Customização para o cabeçalho das colunas
const negrito = (params) => <strong style={{ color: "white", fontSize: "14px" }}>{params.colDef.headerName}</strong>;

const columns = [
	{
		field: "motivo",
		headerName: "Motivo",
		flex: 1,
		headerClassName: "super-app-theme--header",
		hideable: false,
		resizable: false,
		renderHeader: negrito,
	},
	{
		field: "dataInicio",
		headerName: "Data Início",
		flex: 1,
		renderCell: (params) => (params.value ? formatarData(params.value) : ""),
		headerClassName: "super-app-theme--header",
		hideable: false,
		resizable: false,
		filterable: false,
		renderHeader: negrito,
	},
	{
		field: "dataTermino",
		headerName: "Data Término",
		flex: 1,
		renderCell: (params) => (params.value ? formatarData(params.value) : ""),
		headerClassName: "super-app-theme--header",
		hideable: false,
		resizable: false,
		filterable: false,
		renderHeader: negrito,
	},
];

// Textos customizados para a interface da tabela
const textoLocalCustomizado = {
	noRowsLabel: "Nenhum afastamento cadastrado.",
	noResultsOverlayLabel: "Nenhum afastamento encontrado.",
	columnHeaderFiltersTooltipActive: (count) =>
		`${count} ${count !== 1 ? "filtros" : "filtro"} ativo${count !== 1 ? "s" : ""}`,
	columnHeaderFiltersLabel: "Mostrar filtros",
	columnHeaderSortIconLabel: "Ordenar",
	columnMenuLabel: "Menu",
	columnMenuShowColumns: "Mostrar colunas",
	columnMenuManageColumns: "Gerenciar colunas",
	columnMenuFilter: "Filtrar",
	columnMenuUnsort: "Remover ordenação",
	columnMenuSortAsc: "Ordenar crescente",
	columnMenuSortDesc: "Ordenar decrescente",
	filterPanelDeleteIconLabel: "Excluir",
	filterPanelOperatorAnd: "E",
	filterPanelOperatorOr: "Ou",
	filterPanelColumns: "Colunas",
	filterPanelInputLabel: "Pesquisa",
	filterPanelOperators: "Operadores",
	filterPanelInputPlaceholder: "Pesquise",
	filterOperatorContains: "contém",
	filterOperatorEquals: "é igual a",
	filterOperatorStartsWith: "começa com",
	filterOperatorEndsWith: "termina com",
	filterOperatorIs: "é",
	filterOperatorNot: "não é",
	filterOperatorAfter: "está depois de",
	filterOperatorOnOrAfter: "está em ou depois de",
	filterOperatorBefore: "está antes de",
	filterOperatorOnOrBefore: "está em ou antes de",
	filterOperatorIsEmpty: "está vazio",
	filterOperatorIsNotEmpty: "não está vazio",
	filterOperatorIsAnyOf: "é qualquer um de",
	filterValueAny: "qualquer",
	filterValueTrue: "verdadeiro",
	filterValueFalse: "falso",
	footerRowSelected: () => "",
};

export function DataTable({ funcionario }) {
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);
	const { motivo = [], dataInicio = [], dataTermino = [] } = funcionario || {};
	
	// Filtra e formata os dados de afastamentos para exibição na tabela
	const afastamentos = motivo
		.map((motivoItem, index) => ({
			id: index,
			motivo: motivoItem,
			dataInicio: dataInicio[index],
			dataTermino: dataTermino[index],
		}))
		.filter(
			(afastamento) =>
				afastamento.motivo !== "" &&
				afastamento.dataInicio !== "" &&
				afastamento.dataTermino !== "" &&
				afastamento.motivo !== null &&
				afastamento.dataInicio !== null &&
				afastamento.dataTermino !== null,
		);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<Box
			sx={{
				height: "88%",
				width: "100%",
				"& .super-app-theme--header": {
					backgroundColor: "#03161A",
				},

				".css-ptiqhd-MuiSvgIcon-root": {
					color: "white",
				},

				".css-n3fyjk-MuiDataGrid-root .MuiDataGrid-sortIcon": {
					display: "none",
				},

				".css-1ebnjf9-MuiDataGrid-root .MuiDataGrid-columnHeader--last": {
					backgroundColor: "#03161A",
				},
			}}
		>
			<DataGrid
				sx={{
					backgroundColor: "#fff",
					".MuiDataGrid-row.Mui-selected": {
						backgroundColor: "rgba(255, 255, 255, 0.5)",
						"&:hover": {
							backgroundColor: "rgba(255, 255, 255, 0.7)",
						},
					},
					".MuiDataGrid-cell:focus": {
						outline: "1px solid rgba(140, 28, 69, 0.5)",
					},

					"--unstable_DataGrid-radius": "8px",
					width: "100%",
					fontSize: "14px",
					border: "none",
				}}
				rows={afastamentos}
				columns={columns}
				localeText={textoLocalCustomizado}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 5 },
					},
				}}
				pageSizeOptions={[5]}
				disableColumnSelector
				key={windowWidth}
			/>
		</Box>
	);
}
