import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import * as api from '../../services/api.jsx';

const formatarData = (dataISO) => {
  if (!dataISO) return ''; // Return empty string if dataISO is falsy

  const data = new Date(dataISO);

  if (isNaN(data.getTime())) {
    return ''; // Return empty string if date is invalid
  }

  const dia = data.getUTCDate().toString().padStart(2, '0');
  let mes = (data.getUTCMonth() + 1).toString().padStart(2, '0');
  const ano = data.getUTCFullYear();

  return `${dia}/${mes}/${ano}`;
};
const negrito = (params) => (
  <strong style={{ color: "white", fontSize: '16px' }}>{params.colDef.headerName}</strong>
);

const columns = [
  {
    field: 'nomeCompleto',
    headerName: 'Nome',
    flex: 2, // esta coluna será duas vezes mais larga que as outras
    headerClassName: 'super-app-theme--header',
    hideable: false,
    resizable: false,
    renderHeader: negrito,
  },
  {
    field: 'matricula',
    headerName: 'Matrícula',
    flex: 1,
    headerClassName: 'super-app-theme--header',
    hideable: false,
    resizable: false,
    filterable: false,
    renderHeader: negrito,
  },
  {
    field: 'situacao',
    headerName: 'Situação',
    flex: 2,
    headerClassName: 'super-app-theme--header',
    hideable: false,
    resizable: false,
    renderHeader: negrito,
  },
  {
    field: 'anoReferencia',
    headerName: 'Ano',
    flex: 1,
    headerClassName: 'super-app-theme--header',
    hideable: false,
    resizable: false,
    renderHeader: negrito,
  },
  {
    field: 'dataInicio',
    headerName: 'Data Início',
    flex: 1,
    renderCell: (params) => params.value ? formatarData(params.value) : '',
    headerClassName: 'super-app-theme--header',
    hideable: false,
    resizable: false,
    filterable: false,
    renderHeader: negrito,
  },
  {
    field: 'dataTermino',
    headerName: 'Data Término',
    flex: 1,
    renderCell: (params) => params.value ? formatarData(params.value) : '',
    headerClassName: 'super-app-theme--header',
    hideable: false,
    resizable: false,
    filterable: false,
    renderHeader: negrito,
  },
];

const textoLocalCustomizado = {
  noRowsLabel: 'Nenhum funcionário cadastrado.',
  noResultsOverlayLabel: 'Nenhum funcionário encontrado.',
  columnHeaderFiltersTooltipActive: (count) => `${count} ${count !== 1 ? 'filtros' : 'filtro'} ativo${count !== 1 ? 's' : ''}`,
  columnHeaderFiltersLabel: 'Mostrar filtros',
  columnHeaderSortIconLabel: 'Ordenar',
  columnMenuLabel: 'Menu',
  columnMenuShowColumns: 'Mostrar colunas',
  columnMenuManageColumns: 'Gerenciar colunas',
  columnMenuFilter: 'Filtrar',
  columnMenuUnsort: 'Remover ordenação',
  columnMenuSortAsc: 'Ordenar crescente',
  columnMenuSortDesc: 'Ordenar decrescente',
  filterPanelDeleteIconLabel: 'Excluir',
  filterPanelOperatorAnd: 'E',
  filterPanelOperatorOr: 'Ou',
  filterPanelColumns: 'Colunas',
  filterPanelInputLabel: 'Pesquisa',
  filterPanelOperators: 'Operadores',
  filterPanelInputPlaceholder: 'Pesquise',
  filterOperatorContains: 'contém',
  filterOperatorEquals: 'é igual a',
  filterOperatorStartsWith: 'começa com',
  filterOperatorEndsWith: 'termina com',
  filterOperatorIs: 'é',
  filterOperatorNot: 'não é',
  filterOperatorAfter: 'está depois de',
  filterOperatorOnOrAfter: 'está em ou depois de',
  filterOperatorBefore: 'está antes de',
  filterOperatorOnOrBefore: 'está em ou antes de',
  filterOperatorIsEmpty: 'está vazio',
  filterOperatorIsNotEmpty: 'não está vazio',
  filterOperatorIsAnyOf: 'é qualquer um de',
  filterValueAny: 'qualquer',
  filterValueTrue: 'verdadeiro',
  filterValueFalse: 'falso',
  footerRowSelected: () => '',
};

export function DataTable() {
  const navegar = useNavigate();
  const [funcionarios, setFuncionarios] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fetchRows = async () => {
      try {
        const response = await api.buscarUsuarios();
        //console.log(response.data);
        const dataAtual = new Date();
        const funcionariosAtualizados = response.data.map(funcionario => {
          // Inicializa a situacao como "Apto" por padrão
          let situacao = "Apto";
          
          const dataInicio = new Date(funcionario.dataInicio[funcionario.dataInicio.length-1]);
          const dataTermino = new Date(funcionario.dataTermino[funcionario.dataTermino.length-1]);
          console.log(funcionario);
          console.log("data inicio:",dataInicio);
          console.log("data Termino:",dataTermino)
          if (dataAtual >= dataInicio && dataAtual <= dataTermino) {
            situacao = funcionario.motivo[funcionario.motivo.length-1]; //recebe o ultimo motivo do array
          } 
          // Atualiza a situacao do funcionário com o motivo encontrado ou "Apto"
          funcionario.situacao = situacao;
          return funcionario;
        });
    
        setFuncionarios(funcionariosAtualizados);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchRows();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleFuncionarioSelecionado = (params) => {
    const funcionario = params.row;
    navegar('/tela-cadastro', { state: { funcionario } });
  }

  return (
    <Box sx={{
      height: '88vh', width: '80vw', '& .super-app-theme--header': {
        backgroundColor: '#03161A',
      },

      '.css-ptiqhd-MuiSvgIcon-root': {
        color: 'white',
      },

      '.css-n3fyjk-MuiDataGrid-root .MuiDataGrid-sortIcon': {
        display: 'none',
      },

    }} >
      <DataGrid
        sx={{
          backgroundColor: '#fff',
          '.MuiDataGrid-row.Mui-selected': {
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
            },
          },
          '.MuiDataGrid-cell:focus': {
            outline: '1px solid rgba(140, 28, 69, 0.5)',
          },

          '--unstable_DataGrid-radius': 'none',
          width: '100%', fontSize: '16px', border: "none"
        }}
        rows={funcionarios}
        columns={columns}
        localeText={textoLocalCustomizado}
        getRowId={(row) => row._id}
        onRowDoubleClick={handleFuncionarioSelecionado}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 15 },
          },
        }}
        pageSizeOptions={[15, 10, 5]}
        disableColumnSelector
        key={windowWidth}
      />
    </ Box >
  );
};
