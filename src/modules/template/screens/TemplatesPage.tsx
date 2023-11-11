import { Box, Button, Pagination, Tab, TextField, useTheme } from "@mui/material";
import { Header } from "../../../components/common/Header";
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import React from "react";
import { useTemplate } from "../hooks/states/useTemplate";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { TemplatePendente } from "./tabs/TemplatesPendentes";
import { TemplatesAtivos } from "./tabs/TemplatesAtivos";

export const Templates = () => {

  const {
    currentPage,
    currentTemplates,
    totalPages,
    searchValue,
    meusTemplates,
    handleOnClickInsert,
    handleSearchChange,
    handlePageChange
  } = useTemplate();
  const [value, setValue] = React.useState('1');
  const theme = useTheme();


  const handleFileUpload = (file: File) => {
    console.log('Arquivo enviado: ', file);
  };


  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
        <Header 
            title="Meus templates"
            description="Visualize e gerencie todos templates, podendo ativar ou desativar cada um."
            icon={<TableChartOutlinedIcon sx={{ color: theme.palette.primary.contrastText, fontSize: 60 }}/>
           }>
          <Button variant="contained" onClick={handleOnClickInsert}>Cadastrar</Button>
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
            </TabList>
          </Box>
          <TabPanel sx={{p: 0, py: 2}} value="1">
            <TextField
              label="Search Templates"
              variant="outlined"
              value={searchValue}
              onChange={handleSearchChange}
            />
            <TemplatesAtivos currentTemplates={currentTemplates} onFileUpload={handleFileUpload} />

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Pagination color="secondary" siblingCount={0} count={totalPages} page={currentPage} onChange={handlePageChange} />
            </Box>
          </TabPanel>
          <TabPanel value="2">
            <TemplatePendente meusTemplates={meusTemplates} />
          </TabPanel>
        </TabContext>

    </>
  );
}

export default Templates;