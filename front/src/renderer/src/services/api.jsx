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

export const buscarUsuarios = async () => {
    return axios.get(`${BASE_URL}/usuarios`)
}

export const CadastrarUsuario = async (data) => {
    return axios.post(`${BASE_URL}/usuarios`, data)
}

export const excluirUsuario = async (id) => {
    return await axios.delete(`${BASE_URL}/usuarios/${id}`)
}

export const editarUsuario = async (id, data) => {
    return await axios.patch(`${BASE_URL}/usuarios/${id}`, data)
}