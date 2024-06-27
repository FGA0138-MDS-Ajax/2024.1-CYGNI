import React, { useEffect, useState } from "react";
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

export default function TransitionsModal({ open, admin, isEdit, closeModal, setIsModalOpen }) {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (isEdit && admin) {
      setValue("email", admin.email);
      setValue("login", admin.login);
      setValue("senha", admin.senha);
      setValue("privilegios", admin.privilegios);
    } 
    
    else reset();
  }, [isEdit, admin, setValue, reset]);

  
  const handleClose = () => {
    open = false;
    closeModal();
  }

  const handleOpen = () => {
    setIsModalOpen(true);
  }

  const privilegioValor = watch("privilegios", false);

  const aoEnviar = async (data) => {
    console.log(data);
    try {
      if (isEdit) {
        await api.editarAdministrador(admin._id, data);
      }
      else {
        await api.cadastrarAdministrador(data);
      }
      closeModal();
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
              }} id="transition-modal-title" variant="h6" component="h2" >
                {isEdit ? 'Editar Admin' : 'Cadastro Admin'}
              </Typography>
              <Box sx={{
                display: 'flex',
                width: '80%',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 1,
                flexDirection: 'column',
              }}>
                <Campo
                  style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                  id="login"
                  placeholder="Usuário"
                  tipo="text"
                  registro={register}
                  erros={errors}
                  opcoes={{
                    required: "*Campo obrigatório",
                  }}
                />
                <Campo
                  style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                  id="email"
                  placeholder="Email"
                  tipo="email"
                  registro={register}
                  erros={errors}
                  opcoes={{
                    required: "*Campo obrigatório",
                  }}
                />

                {!isEdit && (
                  <Campo
                  style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
                  id="senha"
                  placeholder="Senha"
                  tipo="text"
                  registro={register}
                  erros={errors}
                  opcoes={{
                    required: "*Campo obrigatório",
                  }} />
                )}

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
                    marginTop: '5%',
                    fontWeight: 'bold',
                    borderRadius: '8px',
                    border: '1px solid white',
                    width: '65%',
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
                  }}>{isEdit ? 'Salvar' : 'Cadastrar'}</Button>
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
      }}>Cadastrar Admin</Button>
    </div>
  );
}
