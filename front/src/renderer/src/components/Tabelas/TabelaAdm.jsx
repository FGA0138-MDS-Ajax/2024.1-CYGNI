import React, { useState, useEffect } from 'react';
import * as api from '../../services/api.jsx';
import { DataGrid, GridActionsCellItem, GridHeader } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { HiOutlineTrash } from "react-icons/hi2";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import ModalPerfil from '../../components/ModalPerfil/ModalPerfil.jsx';
import { jwtDecode } from "jwt-decode";
import { propValidatorsDataGrid } from '@mui/x-data-grid/internals';

const negrito = (params) => (
  <strong style={{ color: "white", fontSize: '16px' }}>{params.colDef.headerName}</strong>
);

const renderBoolean = (params) => (
  params.value ? <span>Editor</span> : <span>Leitor</span>
);

const columns = [
  {
    field: 'login',
    headerName: 'Nome de login',
    flex: 1,
    headerClassName: 'super-app-theme--header',
    hideable: false,
    resizable: false,
    renderHeader: negrito,
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
    headerClassName: 'super-app-theme--header',
    hideable: false,
    resizable: false,
    renderHeader: negrito,
  },
  {
    field: 'privilegios',
    headerName: 'Privilégio',
    flex: 1,
    headerClassName: 'super-app-theme--header',
    hideable: false,
    resizable: false,
    filterable: false,
    renderHeader: negrito,
    renderCell: renderBoolean,
  }
];

const textoLocalCustomizado = {
  noRowsLabel: 'Nenhum administrador cadastrado.',
  noResultsOverlayLabel: 'Nenhum administrador encontrado.',
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
  const [admins, setAdmins] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [privilegio, setPrivilegio] = useState(false);

  const fetchRows = async () => {
    try {
      const response = await api.buscarAdministradores();
      setAdmins(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchRows();
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

  useEffect(() => {
    if (!isModalOpen) {
      fetchRows();
    }
  }, [isModalOpen]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const deletarAoClicar = async (admin) => {
    try {
      await api.excluirAdministrador(admin._id);
      setAdmins((prev) => prev.filter((item) => item._id !== admin._id));
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const editarAoClicar = (admin) => {
    setSelectedAdmin(admin);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAdmin(null);
    setIsEdit(false);
  }

  return (
    <Box sx={{
      height: '88vh', width: '80vw', '.super-app-theme--header': {
        backgroundColor: '#03161A',
      },
      '.css-ptiqhd-MuiSvgIcon-root': {
        color: 'white',
      },
      '.css-n3fyjk-MuiDataGrid-root .MuiDataGrid-sortIcon': {
        display: 'none',
      },
      '.css-1ebnjf9-MuiDataGrid-root .MuiDataGrid-columnHeader--last': {
        backgroundColor: '#03161A',
      }

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
          width: '100%', fontSize: '16px', border: "none",
        }}
        rows={admins}
        columns={[
          ...columns,
          ...(privilegio ? [{
            field: 'actions',
            type: 'actions',
            GridHeader: 0,
            getActions: (params) => [
              <GridActionsCellItem
                style={{ color: 'black' }}
                icon={<HiOutlinePencilSquare size={17} />}
                label="Edit"
                onClick={() => editarAoClicar(params.row)}
              />,
              <GridActionsCellItem
                style={{ color: 'black' }}
                icon={<HiOutlineTrash size={17} />}
                label="Delete"
                onClick={() => deletarAoClicar(params.row)}
              />,
            ],
          }] : []),
        ]}
        localeText={textoLocalCustomizado}
        getRowId={(row) => row._id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 15 },
          },
        }}
        pageSizeOptions={[15, 10, 5]}
        disableColumnSelector
        key={windowWidth}
      />
      {isModalOpen && (
        <ModalPerfil
          open={isModalOpen}
          admin={selectedAdmin}
          isEdit={isEdit}
          closeModal={closeModal}
        />
      )}
    </Box>
  );
};