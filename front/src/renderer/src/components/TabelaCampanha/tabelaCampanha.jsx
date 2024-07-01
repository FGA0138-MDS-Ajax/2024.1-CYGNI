import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import * as api from '../../services/api.jsx';
import { useNavigate } from 'react-router-dom';

const TabelaFuncionarios = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

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

  const handleRowClick = (params) => {
    navigate('/tela-calendario', { state: { funcionario: params.row } });
  };

  const formatarData = (dataISO) => {
    const data = new Date(dataISO);
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
      field: 'escala',
      headerName: 'Escala',
      flex: 1,
      headerClassName: 'super-app-theme--header',
      hideable: false,
      resizable: false,
      renderHeader: negrito,
    },
    {
      field: 'escalaInicio',
      headerName: 'Inicio expediente',
      flex: 1,
      headerClassName: 'super-app-theme--header',
      hideable: false,
      resizable: false,
      renderHeader: negrito,
    },
    {
      field: 'dataInicio',
      headerName: 'Início Afastamento',
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
      headerName: 'Fim Afastamento',
      flex: 1,
      renderCell: (params) => formatarData(params.value),
      headerClassName: 'super-app-theme--header',
      hideable: false,
      resizable: false,
      filterable: false,
      renderHeader: negrito,
    },
  ];

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
        onRowClick={handleRowClick}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 15 },
          },
        }}
        pageSizeOptions={[5, 10]}
        key={windowWidth} // Force a re-render when window width changes
      />
    </Box>
  );
};

export default TabelaFuncionarios;
