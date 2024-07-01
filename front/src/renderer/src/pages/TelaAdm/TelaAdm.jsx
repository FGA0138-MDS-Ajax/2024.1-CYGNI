import React from "react";
import { DataTable } from "../../components/Tabelas/TabelaAdm.jsx";
import MenuLateral from "../../components/MenuLateral/MenuLateral.jsx";

import "./TelaAdm.css";


const TelaAdm = () => {
  return (
    <div className="conteiner-adm">
      <MenuLateral />
      <div className="conteiner-telaadm">
        <div className="divisao-titulo-telaadm">
          <h1>Administradores</h1>
          <p>Listagem dos administradores cadastrados no sistema.</p>
        </div>
        <div className="divisao-tabela-telaadm">
          <DataTable />
        </div>
      </div>
    </div>
  );
};

export default TelaAdm;