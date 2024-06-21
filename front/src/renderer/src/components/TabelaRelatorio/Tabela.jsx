import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import * as api from '../../services/api.jsx';

// Define the columns you want to display
const columns = [
  { field: 'nomeCompleto', headerName: 'Nome', width: 150 },
  { field: 'matricula', headerName: 'Matricula', width: 130 },
  { field: 'motivo', headerName: 'Situacao', width: 130 },
  { field: 'dataInicio', headerName: 'Data Inicio', width: 150 },
  { field: 'dataTermino', headerName: 'Data Termino', width: 150 },
];

export function DataTable() {
  const [funcionarios, setFuncionarios] = useState([]);

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

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={funcionarios}
        columns={columns}
        getRowId={(row) => row._id}  // Use _id as the unique id for each row
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
};
