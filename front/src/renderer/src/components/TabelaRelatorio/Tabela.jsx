import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import * as api from '../../services/api.jsx';

const formatarData = (dataISO) => {
  const data = new Date(dataISO);
  const dia = data.getDate().toString().padStart(2, '0');
  let mes = (data.getMonth() + 1).toString().padStart(2, '0');
  const ano = data.getFullYear();
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
    borderRadius: "0px",
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
    field: 'motivo',
    headerName: 'Situação',
    flex: 1,
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
    renderCell: (params) => formatarData(params.value),
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
    renderCell: (params) => formatarData(params.value),
    headerClassName: 'super-app-theme--header',
    hideable: false,
    resizable: false,
    filterable: false,
    renderHeader: negrito,
  },
];

export function DataTable() {
  const [funcionarios, setFuncionarios] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const fetchRows = async () => {
      try {
        const response = await api.buscarUsuarios();
        setFuncionarios(response.data);
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

  return (
    <Box sx={{
      height: '100vh', width: '100vw', '& .super-app-theme--header': {
        backgroundColor: '#03161A', borderRadius: "0px",
      },

    }} >
      <DataGrid
        rows={funcionarios}
        columns={columns}
        style={{ width: '100%', fontSize: '16px', border: "none", borderRadius: "0px" }}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 15 },
          },
        }}
        pageSizeOptions={[5, 10]}
        key={windowWidth} // Force a re-render when window width changes
      />
    </ Box >
  );
};
