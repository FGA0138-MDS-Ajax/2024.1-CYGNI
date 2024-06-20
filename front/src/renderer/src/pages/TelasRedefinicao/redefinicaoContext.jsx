import { createContext, useState } from "react";

export const RedefinicaoContext = createContext("");

export const RedefinicaoProvider = ({ children }) => {
    const [email, setEmail] = useState("");
    const [token, setToken] = useState("");

    return (
        <RedefinicaoContext.Provider value={{ email, setEmail, token, setToken }}>
            {children}
        </RedefinicaoContext.Provider>
    )
}