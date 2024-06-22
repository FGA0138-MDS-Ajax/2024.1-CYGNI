import axios from "axios";

const BASE_URL = "http://localhost:3001";

const createConfig = () => {
    return {
        'headers': {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
    }
};

export const login = async (data) => {
    return axios.post(`${BASE_URL}/administradores/login`, data);
}

export const enviarEmailDeRedefinicao = async (email) => {
    return axios.post(`${BASE_URL}/administradores/email-redefinicao`, email);
}

export const buscarUsuarios = async () => {
    return axios.get(`${BASE_URL}/usuarios`,createConfig());
}

export const cadastrarUsuario = async (data) => {
    return axios.post(`${BASE_URL}/usuarios`, data, createConfig());
}

export const cadastrarAdministrador = async (data) => {
    return axios.post(`${BASE_URL}/administradores`, data);
}

export const redefineSenha = async (data) => {
    return axios.post(`${BASE_URL}/administradores/redefine-senha`, data);
}

export const excluirUsuario = async (id) => {
    return await axios.delete(`${BASE_URL}/usuarios/remover?id=${id}`,createConfig());
}

export const editarUsuario = async (id, data) => {
    return await axios.patch(`${BASE_URL}/usuarios/atualizar?id=${id}`, data,createConfig());
}

export const verificaToken = async ({ token, email }) => {
    return await axios.post(`${BASE_URL}/administradores/verifica-token`, { token, email });
};