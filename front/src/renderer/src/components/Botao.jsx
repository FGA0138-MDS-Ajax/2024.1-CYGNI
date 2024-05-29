import react from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

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
