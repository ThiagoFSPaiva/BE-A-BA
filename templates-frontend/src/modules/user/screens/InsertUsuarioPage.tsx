import { Box, Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography, useTheme } from "@mui/material"
import { Header } from "../../../components/common/Header"
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MPaper from "../../../components/common/MPaper";
import { useUserInsert } from "./hooks/useInsertUser";
import { useNavigate } from "react-router-dom";
import { UsuarioRoutesEnum } from "./routes";

export const InsertUsuarioPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const {
        isEdit,
        matriculaError,
        user,
        disabledButton,
        emailError,
        handleInsertUser,
        handleOnChangeInput
    } = useUserInsert();

    return (
        <>
            <Header
                title={isEdit ? 'Editar Usuário' : 'Cadastrar Usuário'}
                description="Visualize e gerencie todos templates, podendo ativar ou desativar cada um."
                icon={<PersonOutlineOutlinedIcon sx={{ color: theme.palette.primary.contrastText, fontSize: 60 }} />}>
            </Header>


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
                                    value={user.name}
                                    onChange={(event) => handleOnChangeInput(event, 'name')}
                                    label="Nome"
                                    variant="filled"
                                />
                            </FormControl>
                        </Grid>

                        <Grid item xs={6}>
                            <FormControl fullWidth error={emailError}>
                                <TextField
                                    type="email"
                                    value={user.email}
                                    onChange={(event) => handleOnChangeInput(event, 'email')}
                                    label="Email"
                                    variant="filled"
                                    error={emailError}
                                />
                                {emailError && (
                                    <FormHelperText id="email-helper-text">Digite um endereço de e-mail válido.</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <TextField
                                    value={user.cpf}
                                    onChange={(event) => handleOnChangeInput(event, 'cpf')}
                                    label="CPF"
                                    variant="filled"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <TextField
                                    value={user.matricula}
                                    onChange={(event) => handleOnChangeInput(event, 'matricula')}
                                    label="Matricula"
                                    variant="filled"
                                    inputProps={{ maxLength: 6 }}
                                    error={matriculaError}
                                />
                                {matriculaError && (
                                    <FormHelperText id="matricula-helper-text">A matricula deve ter exatamente 6 caracteres</FormHelperText>
                                )}
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <TextField
                                    type="password"
                                    value={user.password}
                                    onChange={(event) => handleOnChangeInput(event, 'password')}
                                    label="Senha"
                                    variant="filled"
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={6}>
                            <FormControl fullWidth variant="filled">
                                <InputLabel>Cargo</InputLabel>
                                <Select
                                    value={user.typeUser}
                                    onChange={(event) => handleOnChangeInput(event, 'typeUser')}
                                    id="demo-simple-select-filled"
                                >
                                    <MenuItem value="user">user</MenuItem>
                                    <MenuItem value="admin">admin</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>


                </Box>
                <Box sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingTop: 3,
                    gap: 2
                }}>

                    <Button onClick={() => navigate(UsuarioRoutesEnum.Usuario)} variant="contained" color="secondary">
                        Cancelar
                    </Button>

                    <Button disabled={disabledButton} onClick={handleInsertUser} variant="contained" color="primary">
                        {isEdit ? 'Salvar' : 'Inserir usuário'}
                    </Button>
                </Box>
            </MPaper>

        </>
    )
}