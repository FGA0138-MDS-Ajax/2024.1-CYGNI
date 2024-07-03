import React, { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import * as api from "../../services/api.jsx";

import MenuLateral from "../../components/MenuLateral/MenuLateral.jsx";
import Campo from "../../components/Campo/Campo.jsx";
import MenuSuspenso from "../../components/MenuSuspenso/MenuSuspenso.jsx";
import Botao from "../../components/Botao/Botao.jsx";
import BotaoRadio from "../../components/BotaoRadio/BotaoRadio.jsx";

import { HiArrowDownTray } from "react-icons/hi2";
import { HiArrowPathRoundedSquare } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi2";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import Alert from "../../components/Alerta/Alerta.jsx";

import "./TelaCadastro.css";
import { jwtDecode } from "jwt-decode";
import { DataTable } from "../../components/Tabelas/TabelaAfastamentos.jsx";

const TelaCadastro = () => {
	const [afastamento, setAfastamento] = useState(false);
	const [campanha, setCampanha] = useState(false);
	const [privilegio, setPrivilegio] = useState(false);
	const [alert, setAlert] = useState(null);
	const [disabled, setDisabled] = useState(false);
	const location = useLocation();
	const navegar = useNavigate();
	const funcionario = location.state?.funcionario;

	const {
		register,
		setValue,
		reset,
		handleSubmit,
		trigger,
		watch,
		formState: { errors },
	} = useForm();

	const porteArmaValor = watch("porteArma", true);
	const sexoValor = watch("sexo", 'M');
	const tipoSanguineoValor = watch("tipoSanguineo", 'AB+');
	const estadoCivilValor = watch("estadoCivil", 'Solteiro(a)');
	const cnhCategoriaValor = watch("cnhCategoria", 'A');
	const escalaValor = watch("escala", '8 x 40');
	const motivoValor = watch("motivo", 'Abono');
	const observacoes = watch("observacoes", '');

	const handleCloseAlert = () => {
		setAlert(null);
	};

	useEffect(() => {
		if (funcionario) {
			reset({
				//cadastro geral
				matricula: funcionario.matricula,
				nomeGuerra: funcionario.nomeGuerra,
				nomeCompleto: funcionario.nomeCompleto,
				sexo: funcionario.sexo,
				dataDeNascimento: funcionario.dataDeNascimento ? new Date(funcionario.dataDeNascimento).toISOString().split('T')[0] : '',
				tipoSanguineo: funcionario.tipoSanguineo,
				nomeMae: funcionario.nomeMae,
				nomePai: funcionario.nomePai,
				email: funcionario.email,
				telefone: funcionario.telefone,
				postGrad: funcionario.postGrad,
				escolaridade: funcionario.escolaridade,
				estadoCivil: funcionario.estadoCivil,

				//documentacao
				rg: funcionario.rg,
				cpf: funcionario.cpf,
				matSiape: funcionario.matSiape,
				cnhCategoria: funcionario.cnhCategoria,
				cnhValidade: funcionario.cnhValidade ? new Date(funcionario.cnhValidade).toISOString().split('T')[0] : '',
				cnhProntuario: funcionario.cnhProntuario,

				//endereco
				cep: funcionario.cep,
				cidade: funcionario.cidade,
				bairro: funcionario.bairro,
				uf: funcionario.uf,
				logradouro: funcionario.logradouro,

				//ficha gerencial
				classificacao: funcionario.classificacao,
				funcao: funcionario.funcao,
				escala: funcionario.escala,
				escalaInicio: funcionario.escalaInicio ? new Date(funcionario.escalaInicio).toISOString().split('T')[0] : '',
				horarioEscala: funcionario.horarioEscala,
				lotacao: funcionario.lotacao,
				comportamento: funcionario.comportamento,
				porteArma: funcionario.porteArma,
				apresentacao: funcionario.apresentacao ? new Date(funcionario.apresentacao).toISOString().split('T')[0] : '',
				admissao: funcionario.admissao ? new Date(funcionario.admissao).toISOString().split('T')[0] : '',
				validadeBienal: funcionario.validadeBienal ? new Date(funcionario.validadeBienal).toISOString().split('T')[0] : '',
				validadeTAF: funcionario.validadeTAF ? new Date(funcionario.validadeTAF).toISOString().split('T')[0] : '',

				//afastamento
				motivo: '',
				anoReferencia: '',
				dataInicio: '',
				dataTermino: '',
				dias: '',
				observacoes: '',
			})
		}

		else {
			// Resetar os campos para um estado inicial
			reset({
				//cadastro geral
				matricula: '',
				nomeGuerra: '',
				nomeCompleto: '',
				sexo: 'M',
				dataDeNascimento: '',
				tipoSanguineo: 'AB+',
				nomeMae: '',
				nomePai: '',
				email: '',
				telefone: '',
				postGrad: '',
				escolaridade: '',
				estadoCivil: 'Solteiro(a)',

				//documentacao
				rg: '',
				cpf: '',
				matSiape: '',
				cnhCategoria: 'A',
				cnhValidade: '',
				cnhProntuario: '',

				//endereco
				cep: '',
				cidade: '',
				bairro: '',
				uf: '',
				logradouro: '',

				//ficha gerencial
				classificacao: '',
				funcao: '',
				escala: '8 x 40',
				escalaInicio: '',
				horarioEscala: '',
				lotacao: '',
				comportamento: '',
				porteArma: true,
				apresentacao: '',
				admissao: '',
				validadeBienal: '',
				validadeTAF: '',

				//afastamento
				motivo: '',
				anoReferencia: '',
				dataInicio: '',
				dataTermino: '',
				dias: '',
				observacoes: '',
			})
		}

		const token = localStorage.getItem("token");
		if (token) {
			try {
				const decodificado = jwtDecode(token);
				setPrivilegio(decodificado.privilegios);
			} catch (error) {
				console.error("erro ao decodificar token:", error);
			}
		}

	}, [funcionario, reset]);

	const aoEnviar = async (dadosDoFormulario) => {
		setDisabled(true);
		try {
			// Filtrando dados válidos
			const dadosValidos = Object.fromEntries(
				Object.entries(dadosDoFormulario).filter(
					([key, value]) => value !== '' && value !== null && value !== undefined
				)
			);

			console.log(dadosValidos); // Adicione este console.log para verificar os dados

			if (funcionario) {
				await api.editarUsuario(funcionario._id, dadosValidos);
				setAlert({ type: "success", message: "Editado com sucesso!" });
				setTimeout(() => {
					setDisabled(false);
					navegar("/inicial");
				}, 1250);
			}
			else {
				await api.cadastrarUsuario(dadosValidos);
				setAlert({ type: "success", message: "Cadastro realizado com sucesso!" });
				setTimeout(() => {
					setDisabled(false);
					navegar("/inicial");
				}, 1250);
			}
		} catch (error) {
			console.error(error); // Adicione este console.log para verificar o erro
			if (error.response && error.response.status === 400) {
				// Trata especificamente o erro BadRequest
				setAlert({ type: "error", message: "Matrícula já existente!" });
			} else {
				// Trata outros tipos de erro
				setAlert({ type: "error", message: "Não foi possível realizar essa ação!" });
			}
			setDisabled(false);
		}
	};


	const excluirUsuario = async () => {
		setDisabled(true);
		try {
			await api.excluirUsuario(funcionario._id);
			setAlert({ type: "success", message: "Funcionário removido com sucesso!" });
			setTimeout(() => {
				setDisabled(false);
				navegar("/inicial");
			}, 1250);
		}
		catch (error) {
			setAlert({ type: "error", message: "Errro ao remover funcionario" });
			setDisabled(false);
		}
	}

	const botaoMudanca = async () => {
		const camposPreenchidos = await trigger(["matricula", "nomeCompleto"]);
		if (camposPreenchidos) setAfastamento(!afastamento);
	};

	const botaoCampanha = async () => {
		setCampanha(!campanha);
	}


	const acessarCampanha = (params) => {
		navegar('/tela-calendario', { state: { funcionario: params } });
	};

	return (
		<div className="cadastro">
			<MenuLateral />

			<div className="conteudo-principal">
				<div className="linha-horizontal">
					<div className="classe-botao">
						<button type="button" className={`botao-dados ${afastamento ? "" : "selecionado"}`} onClick={botaoMudanca}>
							Dados pessoais
						</button>
						{privilegio && (
							<button
								type="button"
								className={`botao-afastamento ${afastamento ? "selecionado" : ""}`}
								onClick={botaoMudanca}
							>
								Afastamento
							</button>
						)}
						{privilegio && funcionario && (
							<button
								type="submit"
								className={"botao-campanha"}
								onClick={(e) => { acessarCampanha(funcionario) }}
							>Campanha Individual</button>
						)}

					</div>
					<hr />
				</div>
				<div className={`conteiner ${!privilegio ? "modoLeitor" : ""}`}>
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
										registro={afastamento ? undefined : register}
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
									registro={afastamento ? undefined : register}
									erros={errors}
									opcoes={{
										required: "*Campo obrigatório",
										pattern: { value: /^[A-Za-z\u00C0-\u00FF\s]+$/, message: "*Somente letras" },
									}}
								/>
								<div className="linha">
									<MenuSuspenso
										id="sexo"
										texto="Sexo"
										opcoes={["M", "F"]}
										largura="40px"
										value={sexoValor}
										onChange={(value) => setValue("sexo", value)} />

									<Campo id="dataDeNascimento" texto="Nascimento" tipo="date" registro={register} erros={errors} />
									<MenuSuspenso
										id="tipoSanguineo"
										texto="Tipo Sanguíneo"
										largura="100%"
										opcoes={["AB+", "AB-", "A+", "A-", "B+", "B-", "O+", "O-"]}
										value={tipoSanguineoValor}
										onChange={(value) => setValue("tipoSanguineo", value)}
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
										opcoes={{ pattern: { value: /[0-9]{11}$/, message: "*Somente números" } }}
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
									value={estadoCivilValor}
									onChange={(value) => setValue("estadoCivil", value)}
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
												value={cnhCategoriaValor}
												onChange={(value) => setValue("cnhCategoria", value)}
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
										<MenuSuspenso
											id="escala"
											texto="Escala"
											largura="125px"
											opcoes={["8 x 40", "12 x 36", "12 x 60", "24 x 72", "Expediente"]}
											value={escalaValor}
											onChange={(value) => setValue("escala", value)}
										/>
										<Campo id="escalaInicio" texto="Início Expediente" tipo="date" registro={register} erros={errors} />
										<Campo id="horarioEscala" texto="Horário" tipo="text" registro={register} erros={errors} />
										<Campo id="lotacao" texto="Lotação" tipo="text" registro={register} erros={errors} />
									</div>
									<div className="linha">
										<Campo id="comportamento" texto="Comportamento" tipo="text" registro={register} erros={errors} />
										<BotaoRadio
											privilegio={!privilegio}
											id="porteArma"
											value={porteArmaValor}
											onChange={(value) => setValue("porteArma", value)}
											opcao1={"Sim"}
											opcao2={"Não"}
											nome={"Porte de Arma"}
										/>
										<Campo id="apresentacao" texto="Apresentação" tipo="date" registro={register} erros={errors} />
										<Campo id="admissao" texto="Admissão" tipo="date" registro={register} erros={errors} />
										<Campo id="validadeBienal" texto="Validade Bienal" tipo="date" registro={register} erros={errors} />
										<Campo id="validadeTAF" texto="Validade TAF" tipo="date" registro={register} erros={errors} />
									</div>
								</fieldset>
							</form>
						</div>
					)}
					<div className="bloco-central">
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
													" ",
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
													"Outros",
												]}
												value={motivoValor}
												onChange={(value) => setValue("motivo", value)}
											/>
											<Campo id="anoReferencia" texto="Ano Referência" tipo="text" registro={register} erros={errors} />
											<Campo id="dataInicio" texto="Data Início" tipo="date" registro={register} erros={errors} />
											<Campo id="dataTermino" texto="Data Término" tipo="date" registro={register} erros={errors} />

										</div>
										<div className="conteiner-observacao">
											<span>Observações</span>
											<p>*opcional</p>
										</div>
										<textarea
											name="Observacao"
											id="observacoes"
											value={observacoes}
											onChange={(value) => setValue("observacoes", event.target.value)} />
									</section>
								</form>
							</div>
						)}
						{afastamento && (
							<div className="lista-afastamentos">
								<h3>Histórico de Afastamento</h3>
								<DataTable funcionario={funcionario} />
							</div>
						)}
					</div>
				</div>

				<div className="div-botoes">
					<div className="div-ultimoEditor">
						{funcionario && (
							<p id="ultimoEditor">{`Último Editor: ${funcionario.ultimoEditor}`}</p>
						)}
					</div>
					<div className="botoes">
						<Botao
							id="voltar"
							icone={<HiArrowPathRoundedSquare size={20} style={{ marginRight: "5px" }} />}
							texto="Voltar"
							cor="#032026"
							corTexto="white"
							largura={"130px"}
							aoClicar={(e) => { navegar("/inicial") }}
						/>

						{funcionario && privilegio && (
							<Botao
								id="excluir"
								icone={<HiOutlineTrash size={20} style={{ marginRight: "5px" }} />}
								texto="Excluir"
								cor="#8C1C45"
								corTexto="white"
								largura={"130px"}
								disabled={disabled}
								aoClicar={(e) => {
									e.preventDefault();
									excluirUsuario(funcionario);
								}}
							/>
						)}

						{funcionario && privilegio && (
							<Botao
								id="atualizar"
								icone={<HiOutlinePencilSquare size={20} style={{ marginRight: "5px" }} />}
								texto="Atualizar"
								cor="#F29B30"
								corTexto="white"
								largura={"130px"}
								disabled={disabled}
								aoClicar={(e) => {
									e.preventDefault();
									handleSubmit(aoEnviar)();
								}}
							/>
						)}


						{!funcionario && (
							<Botao
								id="salvar"
								icone={<HiArrowDownTray size={20} style={{ marginRight: "5px" }} />}
								texto="Salvar"
								cor="#588C7E"
								corTexto="white"
								largura={"130px"}
								disabled={disabled}
								aoClicar={(e) => {
									e.preventDefault();
									handleSubmit(aoEnviar)();
								}}
							/>
						)}
					</div>
				</div>
			</div>
			{alert && <Alert message={alert.message} type={alert.type} onClose={handleCloseAlert} />}
		</div>
	);
};

export default TelaCadastro;