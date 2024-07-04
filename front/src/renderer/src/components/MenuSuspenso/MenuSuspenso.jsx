import React from "react";

const MenuSuspenso = ({ texto, opcoes, largura, onChange, value }) => {
	return (
		<div className="menu-suspenso">
			<span>{texto}</span>
			<select
				value={value}
				onChange={(e) => onChange(e.target.value)}
				style={{
					border: "none",
					borderRadius: "8px",
					height: "30px",
					width: largura,
					paddingLeft: "5px",
				}}
			>
				{opcoes.map((opcao) => (
					<option key={opcao} value={opcao}>
						{opcao}
					</option>
				))}
			</select>
		</div>
	);
};

export default MenuSuspenso;
