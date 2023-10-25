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
} from '@mui/material';
import { connectionAPIPost } from '../../../shared/functions/connection/connectionAPI';

interface Extension {
  value: string;
  label: string;
}

interface Type {
  value: string;
  label: string;
}

export const InsertTemplate = () => {
  const extensoes: Extension[] = [
    { value: 'xlsx', label: 'xlsx' },
    { value: 'xls', label: 'xls' },
    { value: 'csv', label: 'csv' },
  ];

  const tipos: Type[] = [
    { value: 'object', label: 'texto' },
    { value: 'float64', label: 'decimal' },
    { value: 'datetime64[ns]', label: 'data' },
    { value: 'bool', label: 'booleano'},
    { value: 'int64', label: 'inteiro'}

  ];

  const [nome, setNome] = useState<string>('');
  const [extensao, setExtensao] = useState<string>('');
  const [campos, setCampos] = useState<{ name: string; tipo: string }[]>([{ name: '', tipo: '' }]);

  const handleAddCampo = () => {
    const novosCampos = [...campos, { name: '', tipo: '' }];
    setCampos(novosCampos);
  };

  const handleCampoChange = (index: number, campoKey: keyof typeof campos[0], value: string) => {
    const novosCampos = [...campos];
    novosCampos[index] = { ...novosCampos[index], [campoKey]: value };
    setCampos(novosCampos);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const novoTemplate = {
      name: nome,
      extensao: extensao,
      campo: campos
    };


    connectionAPIPost('http://localhost:3000/template/criar-template', novoTemplate)
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error);
    });

  };

  return (
    <Box component="form" maxWidth={400} width="100%" onSubmit={handleSubmit}>
      <Stack spacing={3}>

        <TextField label="Nome do Template" fullWidth value={nome} onChange={(e) => setNome(e.target.value)} />

        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="extensao">Extensao</InputLabel>
          <Select
            labelId="extensao"
            id="select-extensao"
            value={extensao}
            label="Extensao"
            onChange={(e) => setExtensao(e.target.value as string)}
          >
            {extensoes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {campos.map((campo, index) => (
          <div key={index}>
            <TextField
              label={`Campo ${index + 1}`}
              fullWidth
              value={campo.name}
              onChange={(e) => handleCampoChange(index, 'name', e.target.value)}
            />
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id={`tipo-${index}`}>Tipo</InputLabel>
              <Select
                labelId={`tipo-${index}`}
                value={campo.tipo}
                label="Tipo"
                onChange={(e) => handleCampoChange(index, 'tipo', e.target.value)}
              >
                {tipos.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        ))}

        <Button onClick={handleAddCampo} variant="outlined">
          +
        </Button>

        <Button type="submit" size="large" variant="contained" color="success">
          Cadastrar
        </Button>
      </Stack>
    </Box>
  );
};

export default InsertTemplate;