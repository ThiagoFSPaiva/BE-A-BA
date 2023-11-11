import React, { useState } from 'react';
import {
  Box,
  Stack,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
} from '@mui/material';
import { connectionAPIPost } from '../../../shared/functions/connection/connectionAPI';
import { useTemplateInsert } from '../hooks/useInsertTemplate';
import MPaper from '../../../components/common/MPaper';



export const InsertTemplate = () => {

  const tipos = [
    { value: 'object', label: 'texto' },
    { value: 'float64', label: 'decimal' },
    { value: 'datetime64[ns]', label: 'data' },
    { value: 'bool', label: 'booleano' },
    { value: 'int64', label: 'inteiro' }

  ];
  const {
    template,
    disabledButton,
    handleAddCampo,
    handleInsertTemplate,
    handleOnChangeInput
  } = useTemplateInsert();

  return (

    <>
      <MPaper>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <TextField
                  value={template.name}
                  onChange={(event) => handleOnChangeInput(event, 'name')}
                  label="Nome"
                  variant="filled"
                />
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth variant="filled">
                <InputLabel>Extensao</InputLabel>
                <Select
                  value={template.extensao}
                  onChange={(event) => handleOnChangeInput(event, 'extensao')}
                  id="demo-simple-select-filled"
                >
                  <MenuItem value="xls">xls</MenuItem>
                  <MenuItem value="xlsx">xlsx</MenuItem>
                  <MenuItem value="csv">csv</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            {template.campo.map((campo, index) => (
              <Grid key={index} item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    value={campo.name}
                    onChange={(event) => handleOnChangeInput(event, 'campo', index)}
                    label="Nome do Campo"
                    variant="filled"
                    required
                  />
                </FormControl>
                <FormControl fullWidth variant="filled">
                  <InputLabel>Tipo</InputLabel>
                  <Select
                    value={campo.tipo}
                    onChange={(event) => handleOnChangeInput(event, 'tipo', index)}
                  >
                    {tipos.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button onClick={handleAddCampo} variant="contained" color="primary">
                +
              </Button>
            </Grid>


          </Grid>



        </Box>
        <Box sx={{
          display: "flex",
          justifyContent: "flex-end",
          paddingTop: 3,
          gap: 2
        }}>

          <Button variant="contained" color="primary">
            Cancelar
          </Button>

          <Button disabled={disabledButton} onClick={handleInsertTemplate} variant="contained" color="primary">
            Enviar
          </Button>



        </Box>
      </MPaper>
    </>

  );
};

export default InsertTemplate;