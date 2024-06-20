export class CreateUsuarioDto {
    // dados pessoais gerais
    nomeCompleto: string
    matricula: string
    nomeGuerra: string
    nomeMae: string
    nomePai: string
    sexo: string
    dataDeNascimento: Date
    tipoSanguineo: string
    estadoCivil: string
    email: string
    telefone: string
    postGrad: string
    escolaridade: string

    // documentacao
    rg: string
    cpf: string
    matSiape: string
    cnhProntuario: string
    cnhCategoria: string
    cnhValidade: Date

    // endereco
    cep: string
    bairro: string
    cidade: string
    uf: string
    logradouro: string

    // ficha gerencial
    classificacao: string
    funcao: string
    escala: string
    horarioEscala: string
    lotacao: string
    comportamento: string
    porteArma: boolean
    admissao: Date
    apresentacao: Date
    validadeBienal: Date
    validadeTAF: Date

    // afastamento
    motivo: string
    anoReferencia: number
    dataInicio: Date
    dataTermino: Date
    dias: number
    observacoes: string
    //editor
    ultimoEditor :string
    
}
