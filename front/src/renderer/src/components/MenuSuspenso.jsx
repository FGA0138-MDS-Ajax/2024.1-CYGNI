import React from "react";

const MenuSuspenso = ({ texto, opcoes, largura }) => {
	return (
		<div className="menu-suspenso">
			<span>{texto}</span>
			<select 
				style={{
					border: "none",
					borderRadius: "8px",
					height: "30px",
					width: largura,
				 	paddingLeft: "5px"
				}}
			>
				{opcoes.map((opcao, index) => (
					<option key={index} value={index + 1}>
						{opcao}
					</option>
				))}
			</select>
		</div>
	);
};

export default MenuSuspenso;