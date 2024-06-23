const Botao = ({ icone, texto, cor, largura, aoClicar, altura, corTexto }) => {
	return (
		<button
			type="submit"
			style={{
				color: corTexto,
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
