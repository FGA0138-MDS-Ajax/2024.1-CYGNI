import React from "react";
import "./Campo.css";

const Campo = ({ texto, tipo, id, registro, erros, opcoes, placeholder, style }) => {
	return (
		<div className="campo" style={style}>
			<span>{texto}</span>
			<input
				placeholder={placeholder}
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