const Botao = ({ icone, texto, cor, largura, aoClicar, altura }) => {
	return (
		<button
			type="submit"
			style={{
				color: "white",
				backgroundColor: cor,
				width: largura,
				height: altura,
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
