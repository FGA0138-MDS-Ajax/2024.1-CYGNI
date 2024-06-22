import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { colors } from '@mui/material';
import { pink } from '@mui/material/colors';

const BotaoRadio = ({ nome, value, onChange, opcao1, opcao2 }) => {
  const estiloRadio = {
    display: "flex",
    marginRight: "5px",
    width: "15px",
    height: "15px",
    marginTop: "7px",
  };

  return (
    <FormControl >
      <span>{nome}</span>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel
          sx={{ ...estiloRadio, marginRight: "80px" }}
          checked={value === true}
          onChange={() => onChange(true)}
          control={<Radio sx={{
            color: "#032026",
            '&.Mui-checked': {
              color: "purple",
            },
          }} />}
          label={opcao1} />

        <FormControlLabel
          sx={estiloRadio}
          checked={value === false}
          onChange={() => onChange(false)}
          control={<Radio sx={{
            color: "#032026",
            '&.Mui-checked': {
              color: "purple",
            },
          }} />}
          label={opcao2} />
      </RadioGroup>
    </FormControl>
  );
};

export default BotaoRadio;