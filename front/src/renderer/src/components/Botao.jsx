import react from "react";

const Botao = ({ icone, texto, cor, largura }) => {
	return (
		<button
			type="submit"
			style={{
				color: "white",
				backgroundColor: cor,
				width: largura,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			{icone}
			{texto}
		</button>
	);
};

export default Botao;
