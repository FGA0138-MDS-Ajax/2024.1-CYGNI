import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import MenuLateral from "../components/MenuLateral.jsx";
import Campo from "../components/Campo.jsx";
import MenuSuspenso from "../components/MenuSuspenso.jsx";
import Botao from "../components/Botao.jsx";
import RadioBotao from "../components/RadioBotao.jsx";

import { HiArrowDownTray } from "react-icons/hi2";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi2";
import { HiOutlinePencilSquare } from "react-icons/hi2";

import "../styles/TelaCadastro.css";

const TelaCadastro = () => {
	const navegar = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const aoEnviar = () => {
		navegar("/inicial");
	};

	return (
		<div className="cadastro">
			<MenuLateral />
			<div className="conteudo-principal">
				<div className="conteiner">
					<div className="dados-pessoais">
						<h3>Cadastro Geral</h3>
						<form className="formulario-cadastro">
							<fieldset id="secao1">
								<legend>Dados Pessoais</legend>
								<div className="linha">
									<Campo
										id="matricula"
										texto="Matrícula"
										tipo="text"
										registro={register}
										erros={errors}
										opcoes={{
											required: "Campo obrigatório",
											pattern: { value: /^[0-9]*$/, message: "Apenas números são permitidos" },
										}}
									/>
									<Campo id="nomeGuerra" texto="Nome de Guerra" tipo="text" registro={register} erros={errors} />
								</div>
								<Campo
									id="nomeCompleto"
									texto="Nome Completo"
									tipo="text"
									registro={register}
									erros={errors}
									opcoes={{ required: "Campo obrigatório" }}
								/>
								<div className="linha">
									<MenuSuspenso id="sexo" texto="Sexo" opcoes={["M", "F"]} largura="40px" />
									<Campo
										id="nascimento"
										texto="Nascimento"
										tipo="date"
										registro={register}
										erros={errors}
										opcoes={{ required: "Campo obrigatório" }}
									/>
									<MenuSuspenso
										id="tipoSanguineo"
										texto="Tipo Sanguíneo"
										opcoes={["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"]}
										largura="100%"
									/>
								</div>
							</fieldset>
							<fieldset id="secao2">
								<legend>Informações Familiares</legend>
								<Campo id="nomeMae" texto="Nome da Mãe" tipo="text" registro={register} erros={errors} />
								<Campo id="nomePai" texto="Nome do Pai" tipo="text" registro={register} erros={errors} />
								<div className="linha">
									<Campo id="email" texto="Email" tipo="email" registro={register} erros={errors} />
									<Campo id="telefone" texto="Telefone" tipo="text" registro={register} erros={errors} />
								</div>
							</fieldset>
							<fieldset id="secao3">
								<legend>Informações Profissionais</legend>
								<Campo
									id="postGrad"
									texto="Post/Grad."
									tipo="text"
									registro={register}
									erros={errors}
									opcoes={{ required: "Campo obrigatório" }}
								/>
								<Campo
									id="escolaridade"
									texto="Escolaridade"
									tipo="text"
									registro={register}
									erros={errors}
									opcoes={{ required: "Campo obrigatório" }}
								/>
								<MenuSuspenso
									id="estadoCivil"
									texto="Estado Civil"
									opcoes={["Solteiro(a)", "Casado(a)", "Divorciado(a)", "Viúvo(a)"]}
									largura="100%"
								/>
							</fieldset>
						</form>
					</div>

					<div className="bloco-central">
						<div className="documentacao">
							<h3>Documentação</h3>
							<form className="formulario-documentacao">
								<fieldset id="secao4">
									<legend>Documentos pessoais</legend>
									<div className="linha">
										<Campo
											id="rg"
											texto="RG"
											tipo="text"
											pattern="\d{2}\.\d{3}\.\d{3}-\d{1}"
											registro={register}
											erros={errors}
											opcoes={{ required: "Campo obrigatório" }}
										/>
										<Campo
											id="cpf"
											texto="CPF"
											tipo="text"
											pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}"
											registro={register}
											erros={errors}
											opcoes={{ required: "Campo obrigatório" }}
										/>
										<Campo
											id="matSiape"
											texto="Mat Siape"
											tipo="text"
											registro={register}
											erros={errors}
											opcoes={{ required: "Campo obrigatório" }}
										/>
									</div>
									<div className="linha">
										<Campo id="cnhCategoria" texto="CNH Categoria" tipo="text" registro={register} erros={errors} />
										<Campo id="cnhValidade" texto="CNH Validade" tipo="date" registro={register} erros={errors} />
										<Campo id="cnhProntuario" texto="CNH Prontuário" tipo="number" registro={register} erros={errors} />
									</div>
								</fieldset>
							</form>
						</div>

						<div className="endereco">
							<h3>Endereço</h3>
							<form className="formulario-endereco">
								<fieldset id="secao5">
									<legend>Iformações de Endereço</legend>
									<div className="linha">
										<Campo id="cep" texto="CEP" tipo="text" registro={register} erros={errors} />
										<Campo id="cidade" texto="Cidade" tipo="text" registro={register} erros={errors} />
										<Campo id="bairro" texto="Bairro" tipo="text" registro={register} erros={errors} />
										<Campo id="uf" texto="UF" tipo="text" registro={register} erros={errors} />
									</div>
									<Campo id="logradouro" texto="Logradouro" tipo="text" registro={register} erros={errors} />
								</fieldset>
							</form>
						</div>
					</div>

					<div className="ficha-gerencial">
						<h3>Ficha Gerencial</h3>
						<form className="formulario-ficha-gerencial">
							<fieldset id="secao6">
								<legend>Informações Gerenciais</legend>
								<div className="linha">
									<Campo
										id="classificacao"
										texto="Classificação"
										tipo="text"
										registro={register}
										erros={errors}
										opcoes={{ required: "Campo obrigatório" }}
									/>
									<Campo
										id="funcao"
										texto="Função"
										tipo="text"
										registro={register}
										erros={errors}
										opcoes={{ required: "Campo obrigatório" }}
									/>
									<Campo
										id="escala"
										texto="Escala"
										tipo="text"
										registro={register}
										erros={errors}
										opcoes={{ required: "Campo obrigatório" }}
									/>
									<Campo
										id="horario"
										texto="Horário"
										tipo="text"
										registro={register}
										erros={errors}
										opcoes={{ required: "Campo obrigatório" }}
									/>
									<Campo id="lotacao" texto="Lotação" tipo="text" registro={register} erros={errors} />
									<Campo id="comportamento" texto="Comportamento" tipo="text" registro={register} erros={errors} />
								</div>

								<div className="linha">
									<div className="botao-porte-arma">
										<label htmlFor="porteArma">Porte de Arma</label>
										<RadioBotao id="porteArma" />
									</div>
									<Campo
										id="apresentacao"
										texto="Apresentação"
										tipo="text"
										registro={register}
										erros={errors}
										opcoes={{ required: "Campo obrigatório" }}
									/>
									<Campo
										id="admissao"
										texto="Admissão"
										tipo="text"
										registro={register}
										erros={errors}
										opcoes={{ required: "Campo obrigatório" }}
									/>
									<Campo
										id="validadeBienal"
										texto="Validade Bienal"
										tipo="date"
										registro={register}
										erros={errors}
										opcoes={{ required: "Campo obrigatório" }}
									/>
									<Campo
										id="validadeTAF"
										texto="Validade TAF"
										tipo="date"
										registro={register}
										erros={errors}
										opcoes={{ required: "Campo obrigatório" }}
									/>
								</div>
							</fieldset>
						</form>
					</div>
				</div>

				<div className="botoes">
					<Botao
						id="cancelar"
						icone={<HiArrowPathRoundedSquare size={20} style={{ marginRight: "5px" }} />}
						texto="Cancelar"
						cor="#032026"
						largura={"130px"}
					/>

					<Botao
						id="excluir"
						icone={<HiOutlineTrash size={20} style={{ marginRight: "5px" }} />}
						texto="Excluir"
						cor="#8C1C45"
						largura={"130px"}
					/>

					<Botao
						id="editar"
						icone={<HiOutlinePencilSquare size={20} style={{ marginRight: "5px" }} />}
						texto="Editar"
						cor="#F29B30"
						largura={"130px"}
					/>

					<Botao
						id="salvar"
						icone={<HiArrowDownTray size={20} style={{ marginRight: "5px" }} />}
						texto="Salvar"
						cor="#588C7E"
						largura={"130px"}
						aoClicar={(e) => {
							e.preventDefault();
							handleSubmit(aoEnviar)();
						}}
					/>
				</div>
			</div>
		</div>
	);
};

export default TelaCadastro;
