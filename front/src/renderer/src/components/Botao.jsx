import react from "react";

const Botao = ({ icone, texto, cor, largura, aoClicar }) => {
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
			onClick={aoClicar}
		>
			{icone}
			{texto}
		</button>
	);
};

export default Botao;
