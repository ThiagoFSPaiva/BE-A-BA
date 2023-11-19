import { Box, Tab, useTheme } from "@mui/material";
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import TabList from "@mui/lab/TabList";
import React, { useEffect } from "react";
import { Header } from "../../../../components/common/Header";
import { GerenciarAtivos } from "./tabs/GerenciarAtivos";
import { GerenciarPendentes } from "./tabs/GerenciarPendentes";
import { GerenciarInativos } from "./tabs/GerenciarInativos";
import { URL_TEMPLATE } from "../../../../shared/constants/urls";
import { useRequests } from "../../../../shared/hooks/useRequests";
import { TemplateType } from "../../types/TemplateType";
import { useTemplateAdminReducer } from "../../../../store/reducers/templateAdminReducer/useTemplateAdminReducer";
import { MethodsEnum } from "../../../../shared/enums/methods.enum";


export const GerenciarTemplatesPage = () => {
    const theme = useTheme();
    const [value, setValue] = React.useState('1');
    const { setTemplates } = useTemplateAdminReducer();
    const { request } = useRequests();

    useEffect(() => {
        request<TemplateType[]>(URL_TEMPLATE, MethodsEnum.GET, setTemplates);
        }, []);


    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
      };
  
  
    return (

        <>

            <Header
                title="Gerenciar Templates"
                description="Visualize e gerencie todos templates, podendo ativar ou desativar cada um."
                icon={<DashboardCustomizeOutlinedIcon sx={{ color: theme.palette.primary.contrastText, fontSize: 60 }} />}>
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
                        <Tab label="Pendentes" value="2" />
                        <Tab label="Inativos" value="3" />
                    </TabList>
                </Box>
                <TabPanel sx={{ p: 0, py: 2 }} value="1">
                    <GerenciarAtivos/>
                </TabPanel>
                <TabPanel sx={{ p: 0, py: 2 }} value="2">
                    <GerenciarPendentes/>
                </TabPanel>
                <TabPanel sx={{ p: 0, py: 2 }} value="3">
                    <GerenciarInativos/>
                </TabPanel>
            </TabContext>


        </>

    )
}