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