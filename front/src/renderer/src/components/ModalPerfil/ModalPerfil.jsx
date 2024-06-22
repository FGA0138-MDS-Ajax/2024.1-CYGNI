import * as React from 'react';
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import BotaoRadio from "../../components/BotaoRadio/BotaoRadio.jsx";
import Botao from "../../components/Botao/Botao.jsx";
import Campo from '../../components/Campo/Campo.jsx';
import * as api from '../../services/api.jsx'


import './ModalPerfil.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '35%',
  height: '60%',
  color: 'white',
  bgcolor: '#03161A',
  boxShadow: 2,
  p: 4,
};

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const privilegioValor = watch("privilegios", false);

  const aoEnviar = async (data) => {
    try {
      await api.cadastrarAdministrador(data);
      handleClose();
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className=''>
      <Botao aoClicar={handleOpen} largura={'130px'} altura={'30px'} texto="Cadastrar admin" cor="black" />
      <form className="formulario-cadastro-perfil" onSubmit={handleSubmit(aoEnviar)}>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Cadastrar Usuário
              </Typography>
              <div className='teste'>
                <Campo
                  id="email"
                  placeholder="Email"
                  tipo="email"
                  registro={register}
                  erros={errors}
                  opcoes={{
                    required: "*Campo obrigatório",
                  }}
                />
                <Campo
                  id="login"
                  placeholder="Usuário"
                  tipo="text"
                  registro={register}
                  erros={errors}
                  opcoes={{
                    required: "*Campo obrigatório",
                  }} />
                <Campo
                  id="senha"
                  placeholder="Senha"
                  tipo="text"
                  registro={register}
                  erros={errors}
                  opcoes={{
                    required: "*Campo obrigatório",
                  }} />

                <BotaoRadio
                  id="privilegios"
                  value={privilegioValor}
                  onChange={(value) => setValue("privilegios", value)}
                  opcao1={"Editor"}
                  opcao2={"Leitor"}
                  nome={""}
                />

                <Botao
                  id="salvar"
                  icone=""
                  texto="Cadastrar"
                  cor="#588C7E"
                  largura={"130px"}
                  aoClicar={(e) => {
                    e.preventDefault();
                    handleSubmit(aoEnviar)();
                  }} />
              </div>
            </Box>
          </Fade>
        </Modal>
      </form>
    </div>
  );
}