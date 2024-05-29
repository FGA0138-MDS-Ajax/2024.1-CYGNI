import React from "react";
import "../styles/Campo.css";

const Campo = ({ texto, tipo, id, registro, erros}) => {
	
	return (
		<div>
			<span>{texto}</span>
			<input 
			className={erros?.id && "input-error"}
			id={id} 
			type={tipo} 
			{...registro(id, {required: true})}
		    />
			{erros?.[id]?.type === "required" && (<p className="error-message">
            Campo obrigatório.
          	</p>)}
		</div>
	);
};

export default Campo;
