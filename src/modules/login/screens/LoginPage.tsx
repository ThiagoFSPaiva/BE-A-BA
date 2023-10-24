import { Box, Button, CircularProgress, Stack, TextField, Typography} from "@mui/material";
import { useEffect, useState } from "react";
import { images } from "../../../assets";
import { Link, useNavigate } from "react-router-dom";
import { Animate } from "../../../components/common/Animate";
import SVG from "../../../assets/images/login-template.svg";
import { useRequests } from "../../../shared/hooks/useRequests";
import { FirstScreenRoutesEnum } from "../../firstScreen/routes";
import { getAuthorizationToken } from "../../../shared/functions/connection/auth";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { authRequest, loading } = useRequests();
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

  const handleLogin = async () => {
 
    authRequest(navigate,{
      matricula: username,
      password: password,
    });
    
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    console.log('testei')
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
        backgroundColor: "#16171B"
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
            <img src={SVG} style={{ width: "500px",maxWidth: "100%", height: "auto" }} alt="logo"></img>
          </Animate>
          <Typography color="white" variant="h2" fontSize="1.2rem" fontWeight="bold">Sistema de templates</Typography>
          <Typography color="#767676" variant="body1">Otimize sua produtividade cadastrando templates para seus  arquivos.</Typography>
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
        bgcolor: "#202125",
        
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
          <Box sx={{ textAlign: "center", p: 5 }}>
            <Animate type="fade" delay={0.5}>
              <img src={images.logo} alt="logo" height={60}></img>
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
              <Box component="form" maxWidth={400} width="100%">
                <Stack spacing={3}>

          
                  <TextField
                    onChange={handleUsernameChange}
                    value={username}
                    label="Matrícula"
                    fullWidth
                    sx={{
                      '& label': {
                        color: '#fff',
                      },
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: '#5a5a5aba',
                        },
                        '&:hover fieldset': {
                          borderColor: '#5a5a5aba',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#5a5a5aba',
                        },
                        '& input': {
                          color: '#fff',
                        },
                      },
                    }}
                  />
                                
                                
                    <TextField label="Senha" type="password" fullWidth 
                    onChange={handlePasswordChange}
                    value={password}
                      sx={{
                        '& label': {
                          color: '#fff',
                        },
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#5a5a5aba',
                          },
                          '&:hover fieldset': {
                            borderColor: '#5a5a5aba',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#5a5a5aba',
                          },
                          '& input': {
                            color: '#fff',
                          },
                        },
                      }}
                    />

        
                  <Button 
                    disabled={loading}
                    type="submit" size="large" 
                    variant="contained" 
                    color="success" 
                    onClick={handleLogin}
                  >
                    {loading ? <CircularProgress size={25} color="primary"  /> : 'Entrar'}
                  </Button>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography color="#2e7d32">
                      <Link to="#">
                        Esqueceu a senha?
                      </Link>
                    </Typography>
                  </Stack>
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

export default LoginPage;