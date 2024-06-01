import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
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

	const aoEnviar = (dadosFormulario) => {
		console.log(dadosFormulario);
		navegar("/inicial");
	};

	const [afastamento, setAfastamento] = useState(false);
	const [botaoSelecionado, setBotaoSelecionado] = useState(false);

	const botaoMudanca = () => {
		setBotaoSelecionado(!botaoSelecionado);
		setAfastamento(!afastamento);
	};

	return (
		<div className="cadastro">
			<MenuLateral />

			<div className="conteudo-principal">
				<div className="linha-horizontal">
					<div className="classe-botao">
						<button
							type="button"
							className={`botao-dados ${botaoSelecionado ? "" : "selecionado"}`}
							onClick={botaoMudanca}
						> Dados pessoais
						</button>
						<button
							type="button"
							className={`botao-afastamento ${botaoSelecionado ? "selecionado" : ""}`}
							onClick={botaoMudanca}
						>	Afastamento
						</button>
					</div>
					<hr/>
				</div>
				<div className="conteiner">
					<div className={`dados-pessoais ${afastamento ? "modoLeitor" : ""}`}>
						<h3>Cadastro Geral</h3>
						<form className="formulario-cadastro" onSubmit={handleSubmit(aoEnviar)}>
							<fieldset id="secao1">
								<legend>Dados pessoais</legend>
								<div className="linha">
									<Campo
										id="matricula"
										texto="Matrícula"
										tipo="text"
										registro={register}
										erros={errors}
										opcoes={{
											required: "*Campo obrigatório",
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
									opcoes={{
										required: "*Campo obrigatório",
										pattern: { value: /^[A-Za-z\s]+$/, message: "*Somente letras" },
									}}
								/>
								<div className="linha">
									<MenuSuspenso id="sexo" texto="Sexo" opcoes={["M", "F"]} largura="40px" />
									<Campo id="nascimento" texto="Nascimento" tipo="date" registro={register} erros={errors} />
									<MenuSuspenso
										id="tipoSanguineo"
										texto="Tipo Sanguíneo"
										largura="100%"
										opcoes={["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"]}
									/>
								</div>
							</fieldset>
							<fieldset id="secao2">
								<legend>Informações Familiares</legend>
								<Campo id="nomeMae" texto="Nome da Mãe" tipo="text" registro={register} erros={errors} />
								<Campo id="nomePai" texto="Nome do Pai" tipo="text" registro={register} erros={errors} />
								<div className="linha">
									<Campo id="email" texto="Email" tipo="email" registro={register} erros={errors} />
									<Campo
										id="telefone"
										texto="Telefone"
										tipo="text"
										registro={register}
										erros={errors}
										opcoes={{ pattern: { value: /^[0-9]*$/, message: "*Somente números" } }}
									/>
								</div>
							</fieldset>
							<fieldset id="secao3">
								<legend>Informações Profissionais</legend>
								<Campo id="postGrad" texto="Post/Grad." tipo="text" registro={register} erros={errors} />
								<Campo id="escolaridade" texto="Escolaridade" tipo="text" registro={register} erros={errors} />
								<MenuSuspenso
									id="estadoCivil"
									texto="Estado Civil"
									opcoes={["Solteiro(a)", "Casado(a)", "Divorciado(a)", "Viúvo(a)"]}
									largura="100%"
								/>
							</fieldset>
						</form>
					</div>

					{!afastamento && (
						<div className="bloco-central">
							<div className="documentacao">
								<h3>Documentação</h3>
								<form className="formulario-documentacao" onSubmit={handleSubmit(aoEnviar)}>
									<fieldset id="secao4">
										<legend>Documentos pessoais</legend>
										<div className="linha">
											<Campo
												id="rg"
												texto="RG"
												tipo="text"
												registro={register}
												erros={errors}
												opcoes={{ pattern: { value: /^[0-9]*$/, message: "*Somente números" } }}
											/>
											<Campo
												id="cpf"
												texto="CPF"
												tipo="text"
												registro={register}
												erros={errors}
												opcoes={{ pattern: { value: /^[0-9]*$/, message: "*Somente números" } }}
											/>
											<Campo
												id="matSiape"
												texto="Mat Siape"
												tipo="text"
												registro={register}
												erros={errors}
												opcoes={{ pattern: { value: /^[0-9]*$/, message: "*Somente números" } }}
											/>
										</div>
										<div className="linha">
											<MenuSuspenso
												id="cnhCategoria"
												texto="CNH Categoria"
												largura="100%"
												opcoes={["A", "AB", "AC", "AD", "AE", "B", "C", "D", "E"]}
											/>
											<Campo id="cnhValidade" texto="CNH Validade" tipo="date" registro={register} erros={errors} />
											<Campo
												id="cnhProntuario"
												texto="CNH Prontuário"
												tipo="text"
												registro={register}
												erros={errors}
												opcoes={{ pattern: { value: /^[0-9]*$/, message: "*Somente números" } }}
											/>
										</div>
									</fieldset>
								</form>
							</div>
							<div className="endereco">
								<h3>Endereço</h3>
								<form className="formulario-endereco" onSubmit={handleSubmit(aoEnviar)}>
									<fieldset id="secao5">
										<legend>Informações de Endereço</legend>
										<div className="linha">
											<Campo
												id="cep"
												texto="CEP"
												tipo="text"
												registro={register}
												erros={errors}
												opcoes={{ pattern: { value: /^[0-9]*$/, message: "*Somente números" } }}
											/>
											<Campo id="cidade" texto="Cidade" tipo="text" registro={register} erros={errors} />
											<Campo id="bairro" texto="Bairro" tipo="text" registro={register} erros={errors} />
											<Campo
												id="uf"
												texto="UF"
												tipo="text"
												registro={register}
												erros={errors}
												opcoes={{ pattern: { value: /^[A-Z]{2}$/, message: "Ex: DF" } }}
											/>
										</div>
										<Campo id="logradouro" texto="Logradouro" tipo="text" registro={register} erros={errors} />
									</fieldset>
								</form>
							</div>
						</div>
					)}

					{!afastamento && (
						<div className="ficha-gerencial">
							<h3>Ficha Gerencial</h3>
							<form className="formulario-ficha-gerencial" onSubmit={handleSubmit(aoEnviar)}>
								<fieldset id="secao6">
									<legend>Informações Gerenciais</legend>
									<div className="linha">
										<Campo id="classificacao" texto="Classificação" tipo="text" registro={register} erros={errors} />
										<Campo id="funcao" texto="Função" tipo="text" registro={register} erros={errors} />
										<Campo id="escala" texto="Escala" tipo="text" registro={register} erros={errors} />
										<Campo id="horario" texto="Horário" tipo="text" registro={register} erros={errors} />
										<Campo id="lotacao" texto="Lotação" tipo="text" registro={register} erros={errors} />
									</div>
									<div className="linha">
										<Campo id="comportamento" texto="Comportamento" tipo="text" registro={register} erros={errors} />
										<div className="botao-porte-arma">
											<label style={{ color: "#898989", fontWeight: "bold", fontSize: "14px"}} htmlFor="porteArma">
												Porte de Arma
											</label>
											<RadioBotao id="porteArma" />
										</div>
										<Campo id="apresentacao" texto="Apresentação" tipo="date" registro={register} erros={errors} />
										<Campo id="admissao" texto="Admissão" tipo="date" registro={register} erros={errors} />
										<Campo id="validadeBienal" texto="Validade Bienal" tipo="date" registro={register} erros={errors} />
										<Campo id="validadeTAF" texto="Validade TAF" tipo="date" registro={register} erros={errors} />
									</div>
								</fieldset>
							</form>
						</div>
					)}

					{afastamento && (
						<div className="afastamento">
							<h3>Afastamento</h3>
							<form className="formulario-afastamento">
								<section>
									<div className="linha">
										<MenuSuspenso
											id="motivo"
											texto="Motivo"
											largura="190px"
											opcoes={[
												"Abono",
												"LTSP",
												"Férias",
												"LTIP",
												"LTSPF",
												"Núpcias",
												"Licença Paternidade",
												"Dispensa Recompensa",
												" Restrição Médica",
												"Recesso Final de Ano",
												"Atestado de Comparecimento",
												"Atestado de Acompanhamento",
												"Outros"]}
										/>
										<Campo id="anoReferencia" texto="Ano Referência" tipo="text" registro={register} erros={errors} />
										<Campo id="dataInicio" texto="Data Início" tipo="date" registro={register} erros={errors} />
										<Campo id="dataTermino" texto="Data Término" tipo="date" registro={register} erros={errors} />
										<Campo id="dias" texto="Dias" tipo="text" registro={register} erros={errors} />
									</div>
									<span>Observações</span>
									<textarea name="Observação" id="observacoes">veveto e´gay</textarea>
								</section>
							</form>
						</div>
					)}
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