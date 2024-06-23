import * as React from 'react';
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import BotaoRadio from "../../components/BotaoRadio/BotaoRadio.jsx";
import Campo from '../../components/Campo/Campo.jsx';
import * as api from '../../services/api.jsx';

import './ModalPerfil.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '35%',
  height: '60%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  color: 'white',
  bgcolor: '#03161A',
  boxShadow: 2,
};

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    reset();
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const privilegioValor = watch("privilegios", false);

  const aoEnviar = async (data) => {
    console.log(data);
    try {
      await api.cadastrarAdministrador(data);
      handleClose();
      reset();
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div>
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
              <Typography sx={{
                border: '1px solid green',
                width: '100%'
              }} id="transition-modal-title" variant="h6" component="h2" >
                Cadastrar Usuário
              </Typography>
              <Box className='teste' sx={{
                display: 'flex',
                width: '90%',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                border: '2px solid yellow'

              }}>
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
                  tipo="password"
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

                <Button
                  sx={{
                    backgroundColor: 'white',
                    color: '#032026',
                    marginTop: '10%',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    border: '1px solid white',
                    width: '50%',
                    height: '40%',
                    textTransform: 'none',
                    '&:hover': {
                      color: 'white',
                      backgroundColor: '#032026',
                    },
                  }}
                  className='salvar-perfil'
                  onClick={(e) => {
                    e.preventDefault();
                    handleSubmit(aoEnviar)();
                  }}>Cadastrar</Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </form>
      <Button onClick={handleOpen} sx={{
        color: 'white',
        fontWeight: 'bold',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: 'transparent',
        },
      }}>Cadastrar adm</Button>
    </div>
  );
}
