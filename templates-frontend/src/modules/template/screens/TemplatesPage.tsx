import { Box, Button, InputAdornment, MenuItem, Pagination, Select, Tab, TextField, useTheme } from "@mui/material";
import { Header } from "../../../components/common/Header";
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import React from "react";
import { useTemplate } from "../hooks/states/useTemplate";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import { TemplatePendente } from "./tabs/TemplatesPendentes";
import { TemplatesAtivos } from "./tabs/TemplatesAtivos";
import { TemplateInativo } from "./tabs/TemplatesInativos";

export const Templates = () => {

  const {
    handleOnClickInsert,
  } = useTemplate();
  const [value, setValue] = React.useState('1');
  const theme = useTheme();


  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Header
        title="Meus templates"
        description="Visualize todas as rotinas ativas, podenndo fazer download ou upload de um template"
        icon={<TableChartOutlinedIcon sx={{ color: theme.palette.primary.contrastText, fontSize: 60 }} />
        }>
        <Button variant="contained"
          onClick={handleOnClickInsert}
        >
          Cadastrar
        </Button>
      </Header>

      <TabContext value={value}>
        <Box sx={{ borderColor: 'divider', display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example"
            textColor="primary"
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
          <TemplatesAtivos />
        </TabPanel>
        <TabPanel value="2">
          <TemplatePendente/>
        </TabPanel>
        <TabPanel value="3">
          <TemplateInativo/>
        </TabPanel>
      </TabContext>

    </>
  );
}

export default Templates;