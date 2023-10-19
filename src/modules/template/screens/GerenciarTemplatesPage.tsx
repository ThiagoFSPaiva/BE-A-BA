import { useTheme } from "@mui/material";
import { Header } from "../../../components/common/Header"
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';


export const GerenciarTemplatesPage = () => {
    const theme = useTheme();
    return (
        <Header title="Gerenciar Templates" icon={<DashboardCustomizeOutlinedIcon sx={{color: theme.palette.primary.contrastText ,fontSize: 60}} />}>
        </Header>


    )
}