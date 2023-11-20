import { Box, Button, InputAdornment, MenuItem, Pagination, Select, Stack, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, useTheme } from "@mui/material";
import { Header } from "../../../components/common/Header";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { useUser } from "./hooks/useUser";
import { UsuarioRoutesEnum } from "./routes";
import { useNavigate } from "react-router-dom";
import TPaper from "../../../components/common/TPaper";
import { URL_UPLOAD_GET_ALL_USERS } from "../../../shared/constants/urls";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { UserType } from "../../login/types/UserType";
import { useEffect } from "react";
import { useRequests } from "../../../shared/hooks/useRequests";
import { useUserReducer } from "../../../store/reducers/userReducer/useUserReducer";
import React from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { UsersAtivos } from "./tabs/UsersAtivos";
import { UsersInativos } from "./tabs/UsersInativos";



export const UsuariosPage = () => {
  const theme = useTheme();
  const [value, setValue] = React.useState('1');
  const navigate = useNavigate();
  const { setUsers } = useUserReducer();
  const { request } = useRequests();

  useEffect(() => {
    request<UserType[]>(URL_UPLOAD_GET_ALL_USERS, MethodsEnum.GET, setUsers);
  }, []);

  const handleGoToInsertAdmin = () => {
    navigate(UsuarioRoutesEnum.USUARIO_INSERT);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };


  return (

    <>

      <Header
        title="Usuários"
        description="Visualize e gerencie todos os usuários e seus respectivos dados"
        icon={<PersonOutlineOutlinedIcon sx={{ color: theme.palette.primary.contrastText, fontSize: 60 }} />}>
        <Button variant="contained" onClick={handleGoToInsertAdmin}>Cadastrar</Button>
      </Header>


      <TabContext value={value}>
        <Box sx={{ borderColor: 'divider', display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example"
            textColor="secondary"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#43a047",
              },
            }}
          >
            <Tab label="Ativos" value="1" />
            <Tab label="Inativos" value="2" />
          </TabList>
        </Box>
        <TabPanel sx={{ p: 0, py: 2 }} value="1">
          <UsersAtivos/>
        </TabPanel>
        <TabPanel sx={{ p: 0, py: 2 }} value="2">
          <UsersInativos/>
        </TabPanel>
      </TabContext>



    </>

  )
}

