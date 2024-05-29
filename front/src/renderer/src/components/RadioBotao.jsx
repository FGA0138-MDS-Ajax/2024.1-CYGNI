import React, { useState } from "react";

const RadioBotao = () => {
    const [valorSelecionado, setValorSelecionado] = useState('opcao1');
  
    const handleChange = (event) => {
      setValorSelecionado(event.target.value);
    };

    const estiloRadio = {
      marginRight: '5px',
      width: '15px',
      height: '15px',
    };

    return (
      <form>
        <label style={{marginRight: '50px'}}>
          <input
            style={
              estiloRadio
              
            }
            type="radio"
            value="opcao1"
            checked={valorSelecionado === 'opcao1'}
            onChange={handleChange}
          />
          Sim
        </label>

        <label>
          <input
            style={estiloRadio}
            type="radio"
            value="opcao2"
            checked={valorSelecionado === 'opcao2'}
            onChange={handleChange}
          />
          Não
        </label>
      </form>
    );
  }
  
  export default RadioBotao;