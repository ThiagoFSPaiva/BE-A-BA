import { Box, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { images } from "../../../assets";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Animate } from "../../../components/common/Animate";
import SVG from "../../../assets/images/login-template.svg";
import { useRequests } from "../../../shared/hooks/useRequests";
import { FirstScreenRoutesEnum } from "../../firstScreen/routes";
import { getAuthorizationToken } from "../../../shared/functions/connection/auth";
import axios from "axios";
import { URL_AUTH_RECOVERY, URL_AUTH_RESET_PASSWORD } from "../../../shared/constants/urls";
import { MethodsEnum } from "../../../shared/enums/methods.enum";

export const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const { token } = useParams();
  const { request, loading } = useRequests();
  const navigate = useNavigate();


  useEffect(() => {
    const token = getAuthorizationToken();
    if (token) {
      navigate(FirstScreenRoutesEnum.FIRST_SCREEN);
    }
  }, []);

  if (getAuthorizationToken()) {
    return null;
  }

  const handleRecovery = async () => {

    await request(URL_AUTH_RESET_PASSWORD,MethodsEnum.POST,undefined,{token,newPassword},"Senha alterada")
    navigate(FirstScreenRoutesEnum.FIRST_SCREEN);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };


  return (
    <Box
      position="relative"
      height="100vh"
      sx={{ "::-webkit-scrollbar": { display: "none" } }}
    >
      {/* background box */}
      <Box sx={{
        position: "absolute",
        right: 0,
        height: "100%",
        width: "60%",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundColor: theme => theme.palette.background.default
      }}>
        <Box sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "10px",
          height: "100%"

        }}>
          <Animate type="fade" delay={0.5}>
            <img src={SVG} style={{ width: "500px", maxWidth: "100%", height: "auto" }} alt="logo"></img>
          </Animate>
          <Typography color={theme => theme.palette.text.primary} variant="h2" fontSize="1.2rem" fontWeight="bold">Sistema de templates</Typography>
          <Typography color={theme => theme.palette.text.secondary} variant="body1">Otimize sua produtividade cadastrando templates para seus  arquivos.</Typography>
        </Box>
      </Box>
      {/* background box */}

      {/* Login form */}
      <Box sx={{
        position: "absolute",
        left: 0,
        height: "100%",
        width: { xl: "40%", lg: "40%", md: "40%", xs: "100%" },
        transition: "all 1s ease-in-out",
        bgcolor: theme => theme.palette.background.paper,
        border: theme => theme.palette.mode === 'dark' ? "1px solid #5a5a5a52" : 'none',

      }}>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          opacity: 1,
          transition: "all 0.3s ease-in-out",
          height: "100%",
          "::-webkit-scrollbar": { display: "none" }
        }}>


          {/* logo */}
          <Box m="30px auto">

            <Animate type="fade" delay={0.5}>
              <Stack spacing={2} direction="row" alignItems="center">
                <img src={images.logo} alt="logo" height={60}></img>
                <Typography color={theme => theme.palette.text.primary} variant="h5" fontWeight="bold">Templates</Typography>
              </Stack>
            </Animate>
          </Box>

          {/* logo */}


          {/* form */}
          <Box sx={{
            position: "absolute",
            top: 0,
            left: 0,
            padding: "20px",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "::-webkit-scrollbar": { display: "none" }
          }}>
            <Animate type="fade" sx={{ maxWidth: 400, width: "100%" }}>
              <Box maxWidth={400} width="100%">
                <Stack spacing={3}>

                  <div>
                    <Typography color={theme => theme.palette.text.primary} variant="h6" fontWeight="bold">Crie uma nova senha</Typography>
                    <Typography color={theme => theme.palette.text.secondary} variant="subtitle2" maxWidth={300}>
                      Digite sua nova senha
                    </Typography>
                  </div>
                  <TextField
                    onChange={handleEmailChange}
                    value={newPassword}
                    label="Nova senha"
                    fullWidth
                  />


                  <Button
                    disabled={loading}
                    type="submit" size="large"
                    variant="contained"
                    color="primary"
                    onClick={handleRecovery}
                  >
                    {loading ? <CircularProgress size={25} color="primary" /> : 'Enviar'}
                  </Button>
                </Stack>
              </Box>
            </Animate>
          </Box>
          {/* form */}
        </Box>
      </Box>
      {/* Login form */}
    </Box>
  );
};
