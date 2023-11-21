import { Header } from "../../../components/common/Header"
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Fade, FilledInput, FormControl, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, Modal, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useGlobalReducer } from "../../../store/reducers/globalReducer/useGlobalReducer";
import { useUpdateUser } from "./hooks/useUpdateUser";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React from "react";

export const SettingsUser = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showNewPassword, setShowNewPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseDownNewPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const { user } = useGlobalReducer();
    const {
        errorPassword,
        disabledButton,
        changePasswordModalOpen,
        handleOnChangeInput,
        handleUpdatePassword,
        handleCloseChangePasswordModal,
        handleOpenChangePasswordModal
    } = useUpdateUser();

    return (
        <>
            <Header
                title="Configurações"
                description="Informações básicas, como seu nome e cpf, que você usa na plataforma QQ Templates"
                icon={<SettingsIcon sx={{ color: theme => theme.palette.primary.contrastText, fontSize: 60 }} />}>
            </Header>

            <Box sx={{
                p: 3,
                bgcolor: theme => theme.palette.background.paper,
                border: "1px solid #5a5a5a52",
                borderRadius: "10px"

            }}>
                <TableContainer style={{ marginTop: 20 }}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead sx={{ bgcolor: theme => theme.palette.secondary.dark }}>
                            <TableRow>
                                <TableCell colSpan={2} sx={{ py: 1, mb: 2, borderRadius: '5px 5px 0 0' }}>
                                    <Typography variant="subtitle2" color={theme => theme.palette.secondary.contrastText} fontWeight="bold">
                                        Informações básicas
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle2" color={theme => theme.palette.text.secondary}>
                                        Nome completo
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="subtitle2" color={theme => theme.palette.text.primary}>
                                        {user?.name}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle2" color={theme => theme.palette.text.secondary}>
                                        CPF
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="subtitle2" color={theme => theme.palette.text.primary}>
                                        {user?.cpf}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle2" color={theme => theme.palette.text.secondary}>
                                        Matricula
                                    </Typography>
                                </TableCell>
                                <TableCell align="center">
                                    <Typography variant="subtitle2" color={theme => theme.palette.text.primary}>
                                        {user?.matricula}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ borderBottom: 'none' }}>
                                    <Typography variant="subtitle2" color={theme => theme.palette.text.secondary}>
                                        Data de criacao
                                    </Typography>
                                </TableCell>
                                <TableCell align="center" sx={{ borderBottom: 'none' }}>
                                    <Typography variant="subtitle2" color={theme => theme.palette.text.primary}>
                                        {user?.createdAt}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>

                    </Table>
                </TableContainer>
                <TableContainer style={{ marginTop: 20 }}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead sx={{ bgcolor: theme => theme.palette.secondary.dark }}>
                            <TableRow>
                                <TableCell colSpan={2} sx={{ py: 1, mt: 2, borderRadius: '5px 5px 0 0' }}>
                                    <Typography variant="subtitle2" color={theme => theme.palette.secondary.contrastText} fontWeight="bold">
                                        Alterar
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Typography variant="subtitle2" color={theme => theme.palette.text.secondary}>
                                        Foto de perfil
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <IconButton sx={{ color: theme => theme.palette.text.secondary }} >
                                        <ArrowForwardIosIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell sx={{ borderBottom: 'none' }}>
                                    <Typography variant="subtitle2" color={theme => theme.palette.text.secondary}>
                                        Senha
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ borderBottom: 'none' }}>
                                    <IconButton sx={{ color: theme => theme.palette.text.secondary }} onClick={handleOpenChangePasswordModal} >
                                        <ArrowForwardIosIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box >

            <Dialog open={changePasswordModalOpen} onClose={handleCloseChangePasswordModal}>
                <Box sx={{ bgcolor: (theme) => theme.palette.background.paper, p: 1, border: "1px solid #5a5a5a52", minWidth: "500px" }}>
                    <DialogTitle variant="h6">Alterar senha</DialogTitle>
                    <DialogContent>
                        <Stack spacing={2}>
                            
                            <FormControl 
                                fullWidth variant="filled"
                                error={errorPassword}
                                >
                                <InputLabel htmlFor="filled-adornment-password">Senha atual</InputLabel>
                                <FilledInput
                                    id="filled-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={(event) => handleOnChangeInput(event, 'password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                {errorPassword && (
                                    <FormHelperText id="password-helper-text">Senha atual incorreta</FormHelperText>
                                )}
                            </FormControl>
                            <FormControl fullWidth variant="filled">
                                <InputLabel htmlFor="filled-adornment-newPassword">Nova senha</InputLabel>
                                <FilledInput
                                    id="filled-adornment-newPassword"
                                    type={showNewPassword ? 'text' : 'password'}
                                    onChange={(event) => handleOnChangeInput(event, 'newPassword')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowNewPassword}
                                                onMouseDown={handleMouseDownNewPassword}
                                                edge="end"
                                            >
                                                {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                        </Stack>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={handleCloseChangePasswordModal} color="primary">
                            Cancelar
                        </Button>
                        <Button disabled={disabledButton} variant="contained" color="error" onClick={handleUpdatePassword}>
                            Salvar
                        </Button>
                    </DialogActions>
                </Box>
            </Dialog>





        </>



    )

}