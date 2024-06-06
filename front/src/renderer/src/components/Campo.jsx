import React from "react";
import "../styles/Campo.css";

const Campo = ({ texto, tipo, id, registro, erros, opcoes }) => {
	return (
		<div className="campo">
			<span>{texto}</span>
			<input
				spellCheck={false}
				className={erros?.[id] ? "erro-input" : ""}
				id={id}
				type={tipo}
				{...(typeof registro === "function" ? registro(id, opcoes) : {})}
			/>
			{erros?.[id] && <p className="mensagem-erro">{erros[id].message}</p>}
		</div>
	);
};

export default Campo;
