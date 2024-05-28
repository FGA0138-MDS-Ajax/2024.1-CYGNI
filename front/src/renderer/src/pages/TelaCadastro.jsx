import React from "react";
import MenuLateral from "../components/MenuLateral.jsx";
import Campo from "../components/Campo.jsx";
import MenuSuspenso from "../components/MenuSuspenso.jsx";
import '../styles/TelaCadastro.css';
import Botao from "../components/Botao.jsx";
import { HiArrowDownTray } from "react-icons/hi2";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi2";
import { HiOutlinePencilSquare } from "react-icons/hi2";

const TelaCadastro = () => {
  return (
    <div className="cadastro">
      <MenuLateral />
      <div className="conteudo-principal">
        <div className="conteiner">
          <div className="dados-pessoais">
            <h3>Cadastro Geral</h3>
            <form className="formulario-cadastro">
              <fieldset id='secao1'>
                <legend>Dados Pessoais</legend>
                  <div className="linha">
                    <Campo id="matricula" texto="Matrícula" tipo="text" />
                    <Campo id="nomeGuerra" texto="Nome de Guerra" tipo="text" />
                  </div>
                    <Campo id="nomeCompleto" texto="Nome Completo" tipo="text" />
                  <div className="linha">
                    <MenuSuspenso id="sexo" texto="Sexo" opcoes={['M', 'F']} />
                    <Campo id="nascimento" texto="Nascimento" tipo="date" />
                    <MenuSuspenso id="tipoSanguineo" texto="Tipo Sanguíneo"
                     opcoes={['AB+', 'AB-','A+', 'A-', 'B+', 'B-', 'O+', 'O-']} />
                  </div>
              </fieldset>
              <fieldset id='secao2'>
                <legend>Informações Familiares</legend>
                  <Campo id="nomeMae" texto="Nome da Mãe" tipo="text" />
                  <Campo id="nomePai" texto="Nome do Pai" tipo="text" />
                  <div className="linha">
                    <Campo id="email" texto="Email" tipo="email" />
                    <Campo id="telefone" texto="Telefone" tipo="text" />
                  </div>
              </fieldset>
              <fieldset id='secao3'>
                <legend>Informações Profissionais</legend>
                <Campo id="postGrad" texto="Post/Grad." tipo="text" />
                <Campo id="escolaridade" texto="Escolaridade" tipo="text" />
                <MenuSuspenso id="estadoCivil" texto="Estado Civil" 
                opcoes={['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)']} />
              </fieldset>
            </form>
          </div>

          <div className="mid">
            <div className="documentacao">
              <h3>Documentação</h3>
              <form className="formulario-documentacao">
                <fieldset id='secao4'>
                  <legend>Documentos pessoais</legend>
                    <div className="linha">
                      <Campo id="rg" texto="RG" tipo="text" pattern="\d{2}\.\d{3}\.\d{3}-\d{1}" />
                      <Campo id="cpf" texto="CPF" tipo="text" pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}" />
                      <Campo id="matSiape" texto="Mat Siape" tipo="text" />
                    </div>
                    <div className="linha">
                      <Campo id="cnhCategoria" texto="CNH Categoria" tipo="text" />
                      <Campo id="cnhValidade" texto="CNH Validade" tipo="date" />
                      <Campo id="cnhProntuario" texto="CNH Prontuário" tipo="number" />
                    </div>
                </fieldset>
              </form>
            </div>

            <div className="endereco">
              <h3>Endereço</h3>
              <form className="formulario-endereco">
                <fieldset id='secao5'>
                  <legend>Iformações de Endereço</legend>
                    <div className="linha">
                      <Campo id="cep" texto="CEP" tipo="text" />
                      <Campo id="cidade" texto="Cidade" tipo="text" />
                      <Campo id="bairro" texto="Bairro" tipo="text" />
                      <Campo id="uf" texto="UF" tipo="text" />
                    </div>
                  <Campo id="logradouro" texto="Logradouro" tipo="text" />
                </fieldset>
              </form>
            </div>
          </div>

          <div className="ficha-gerencial">
            <h3>Ficha Gerencial</h3>
            <form className="formulario-ficha-gerencial">
              <fieldset id='secao6'>
                <legend>Informações Gerenciais</legend>
                  <div className="linha">
                    <Campo id="classificacao" texto="Classificação" tipo="text" />
                    <Campo id="funcao" texto="Função" tipo="text" />
                    <Campo id="escala" texto="Escala" tipo="text" />
                    <Campo id="horario" texto="Horário" tipo="text" />
                    <Campo id="lotacao" texto="Lotação" tipo="text" />
                    <Campo id="comportamento" texto="Comportamento" tipo="text" />
                  </div>
                  <div className="linha">
                    <Campo id="porteArma" texto="Porte de Arma" tipo="radio" />
                    <Campo id="apresentacao" texto="Apresentação" tipo="text" />
                    <Campo id="admissao" texto="Admissão" tipo="text" />
                    <Campo id="validadeBienal" texto="Validade Bienal" tipo="date" />
                    <Campo id="validadeTAF" texto="Validade TAF" tipo="date" />
                  </div>
              </fieldset>
            </form>
          </div>
        </div>

        <div className="botoes">
          <Botao id="cancelar" icone={<HiArrowPathRoundedSquare size={20} style={{marginRight: '5px'}}/>}
              texto="Cancelar" cor="#032026" largura={"130px"} />

          <Botao id="excluir" icone={<HiOutlineTrash size={20} style={{marginRight: '5px'}}/>}
              texto="Excluir" cor="#8C1C45" largura={"130px"} />

          <Botao id="editar" icone={<HiOutlinePencilSquare size={20} style={{marginRight: '5px'}}/>}
              texto="Editar" cor="#F29B30" largura={"130px"} />      
          
          <Botao id="salvar" icone={<HiArrowDownTray size={20} style={{marginRight: '5px'}}/>}
              texto="Salvar" cor="#588C7E" largura={"130px"} />
        </div>
      </div>
    </div >
  )
};

export default TelaCadastro;