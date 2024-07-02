import axios from "axios";

const BASE_URL = "http://localhost:80";

const createConfig = () => {
    return {
        'headers': {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    }
};

// administrador
export const login = async (data) => {
    return axios.post(`${BASE_URL}/administradores/login`, data);
}

export const cadastrarAdministrador = async (data) => {
    return axios.post(`${BASE_URL}/administradores`, data);
}

export const buscarAdministradores = async (data) => {
    return axios.get(`${BASE_URL}/administradores`, data);
}

export const editarAdministrador = async (id, data) => {
    return axios.patch(`${BASE_URL}/administradores/${id}`, data);
}

export const excluirAdministrador = async (id) => {
    return axios.delete(`${BASE_URL}/administradores/${id}`);
}

// redefinicao de senha
export const enviarEmailDeRedefinicao = async (email) => {
    return axios.post(`${BASE_URL}/administradores/email-redefinicao`, email);
}

export const verificaToken = async ({ token, email }) => {
    return await axios.post(`${BASE_URL}/administradores/verifica-token`, { token, email });
};

export const redefineSenha = async (data) => {
    return axios.post(`${BASE_URL}/administradores/redefine-senha`, data);
}


// crud usuario
export const cadastrarUsuario = async (data) => {
    return axios.post(`${BASE_URL}/usuarios`, data, createConfig());
}

export const buscarUsuarios = async () => {
    return axios.get(`${BASE_URL}/usuarios`, createConfig());
}

export const editarUsuario = async (id, data) => {
    return await axios.patch(`${BASE_URL}/usuarios/atualizar?id=${id}`, data, createConfig());
}

export const excluirUsuario = async (id) => {
    return await axios.delete(`${BASE_URL}/usuarios/remover?id=${id}`, createConfig());
}