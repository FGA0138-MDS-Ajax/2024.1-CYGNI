import React, { useState } from "react";
import Botao from "../../components/Botao/Botao.jsx";
import { useNavigate } from "react-router-dom";
import Icone from "../../assets/img/IconeAGIS.svg";
import "./TelaRecuperacao.css";
import { HiArrowUturnLeft } from "react-icons/hi2";

const TelaRecuperacao = () => {

  const navegar = useNavigate();

  const [email, setEmail] = useState(null);
  const [chave, setChave] = useState(null);

  function handleInputChange({target}){
    setEmail(target.value)
  } 

  function handleChaveChange({target}){
    setChave(target.value)
  }


  return (

    <div className="container-recuperacao">
      <div className="botao-voltar">
        <Botao
          id="voltar"
          icone={<HiArrowUturnLeft size={20} style={{ marginRight: "5px" }} />}
          texto="Voltar"
          cor="#032026"
          largura={"130px"}
          aoClicar={() => {
            navegar("/");
          }}
        />
      </div>
      <div className="formulario">
        <img id='img-icone' src={Icone} alt="icone" />
        <h1>Recuperação de senha</h1>
        <input type="email" name="" id="email" placeholder="Digite o seu e-mail" onChange={(e) => handleInputChange(e)}/>
        <Botao id='botao-rec' largura={'26.5%'} cor={'#FFA800'} corTexto={'#032026'} texto={'Enviar'} />
        <div className="container-verificacao">
          <input type="text" name="" id="" placeholder="Digite o código de recuperação" onChange={(e) => handleChaveChange(e)}/>
          <Botao id='botao-val' largura={'20%'} cor={'#FFA800'} corTexto={'#032026'} texto={'Verificar'}
            aoClicar={async (e) => {
              e.preventDefault();
              
              try{
                navegar('/tela-redefinicao');
              }
              catch(error){
                
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default TelaRecuperacao; 