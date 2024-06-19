const RadioBotao = ({value, onChange}) => {
	const estiloRadio = {
		marginRight: "5px",
		width: "15px",
		height: "15px",
		marginTop: "7px",
	};

	return (
		<div>
			<label style={{ marginRight: "50px" }}>
				<input
					style={estiloRadio}
					type="radio"
					value="true"
					checked={value === true}
					onChange={() => onChange(true)}
				/>
				Sim
			</label>

			<label>
				<input
					style={estiloRadio}
					type="radio"
					value="false"
					checked={value === false}
					onChange={() => onChange(false)}
				/>
				Não
			</label>
		</div>
	);
};

export default RadioBotao;
