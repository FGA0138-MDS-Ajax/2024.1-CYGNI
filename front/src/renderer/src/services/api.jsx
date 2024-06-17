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
    return axios.post(`${BASE_URL}/administradores/login`, data)
}

export const enviarEmailDeRedefinicao = async (email) => {
    return axios.post(`${BASE_URL}/administradores/email-redefinicao`, email);
}

export const verificaToken = async (data) => {
    return axios.post(`${BASE_URL}/administradores/verifica-token`, data);
}

export const redefineSenha = async (data) => {
    return axios.post(`${BASE_URL}/administradores/redefine-senha`, data);
}