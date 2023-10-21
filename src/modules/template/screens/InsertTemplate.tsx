import { Box, Button, MenuItem, Stack, TextField } from "@mui/material"
import { useState } from "react";
import { useRequests } from "../../../shared/hooks/useRequests";
import axios from "axios";
import { connectionAPIPost } from "../../../shared/functions/connection/connectionAPI";
import { MethodsEnum } from "../../../shared/enums/methods.enum";


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
        { value: 'extensao1', label: 'Extensão 1' },
        { value: 'extensao2', label: 'Extensão 2' },
        { value: 'extensao3', label: 'Extensão 3' },
      ];
    
      const tipos: Type[] = [
        { value: 'tipo1', label: 'Tipo 1' },
        { value: 'tipo2', label: 'Tipo 2' },
        { value: 'tipo3', label: 'Tipo 3' },
      ];
    
      const [nome, setNome] = useState<string>('');
      const [extensao, setExtensao] = useState<string>('');
      const [campo, setCampo] = useState<string>('');
      const [tipo, setTipo] = useState<string>('');
      const { request } = useRequests();
    
      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

  
        const novoTemplate = {
            name: nome,
            extensao: extensao,
            campo: [
              {
                name: campo,
                tipo: tipo,
              },
            ],
          };

          // request('http://localhost:3000/template/criar-template', MethodsEnum.POST, novoTemplate)
          //   .then((response) => {
          //     console.log(response)
          //   })
          //   .catch((error) => {
          //     console.log(error);
          //   });

          // connectionAPIPost('http://localhost:3000/template/criar-template', novoTemplate)
          //   .then((response) => {
          //     console.log(response)
          //   })
          //   .catch((error) => {
          //     console.log(error);
          //   });
        
        
        // Aqui, você pode adicionar a lógica para enviar os dados para a rota
        console.log('Dados a serem enviados:', { nome, extensao, campo, tipo });
      };
    
      return (
        <Box component="form" maxWidth={400} width="100%" onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField label="Nome" fullWidth value={nome} onChange={(e) => setNome(e.target.value)} />
            <TextField
              fullWidth
              select
              label="Select"
              value={extensao}
              onChange={(e) => setExtensao(e.target.value)}
            >
              {extensoes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField label="Campo" fullWidth value={campo} onChange={(e) => setCampo(e.target.value)} />
            <TextField
              select
              label="Tipo"
              fullWidth
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
            >
              {tipos.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
    
            <Button type="submit" size="large" variant="contained" color="success">
              Cadastrar
            </Button>
          </Stack>
        </Box>
      );
    
    };
    