import React, { useState } from "react";

const RadioBotao = () => {
    const [valorSelecionado, setValorSelecionado] = useState('');
  
    const handleChange = (event) => {
      setValorSelecionado(event.target.value);
    };
  
    return (
      <form>
        <label style={{marginRight: '12px'}}>
          <input
            type="radio"
            value="opcao1"
            checked={valorSelecionado === 'opcao1'}
            onChange={handleChange}
          />
          Sim
        </label>

        <label>
          <input
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