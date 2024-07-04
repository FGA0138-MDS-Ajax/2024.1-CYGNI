const Botao = ({ icone, texto, cor, largura, aoClicar, corTexto, disabled }) => {
	return (
		<button
			disabled={disabled}
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
