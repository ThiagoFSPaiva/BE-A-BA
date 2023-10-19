import { useTheme } from "@mui/material";
import { Header } from "../../../components/common/Header";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';


export const UsuariosPage = () => {

  const theme = useTheme();

  return (
    <Header title="Usuarios" icon={<PersonOutlineOutlinedIcon sx={{color: theme.palette.primary.contrastText ,fontSize: 60}} />}>
    </Header>
    
  )
}

