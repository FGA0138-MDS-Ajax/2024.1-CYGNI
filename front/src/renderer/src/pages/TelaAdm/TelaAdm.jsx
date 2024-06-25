import React from "react";
import { DataTable } from "../../components/TabelaAdm/TabelaAdm.jsx";
import MenuLateral from "../../components/MenuLateral/MenuLateral.jsx";

import "./TelaAdm.css";


const TelaAdm = () => {
  return (
    <div className="conteiner-adm">
      <MenuLateral />
      <div className="conteiner-tabela-adm">
        <DataTable />      
      </div>
    </div>
  );
};

export default TelaAdm;