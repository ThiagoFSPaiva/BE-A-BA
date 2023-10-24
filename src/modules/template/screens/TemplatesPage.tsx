import { Box, Button, Card, CardActions, CardContent, Grid, Link, Pagination, Paper, Stack, Tab, Tabs, TextField, Typography, useTheme } from "@mui/material";
import { Header } from "../../../components/common/Header";
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { useEffect, useState } from "react";
import { useRequests } from "../../../shared/hooks/useRequests";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { TemplateType } from "../types/TemplateType";
import { URL_TEMPLATE, URL_TEMPLATE_DOWNLOAD } from "../../../shared/constants/urls";
import { useTemplateReducer } from "../../../store/reducers/templateReducer/useTemplateReducer";
import React from "react";
import { useTemplate } from "../hooks/useTemplate";
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import MPaper from "../../../components/common/MPaper";
import { TemplatePendente } from "./tabs/TemplatesPendentes";
import axios from "axios";

export const Templates = () => {
  const { handleOnClickInsert } = useTemplate();
  const { templateAtivos, setTemplateAtivo } = useTemplateReducer();
  const [value, setValue] = React.useState('1');
  const { request, postRequest } = useRequests();
  const [templatesFiltered, setTemplatesFiltered] = useState<TemplateType[]>(templateAtivos);
  const [searchValue, setSearchValue] = useState('');
  const [originalTemplates, setOriginalTemplates] = useState<TemplateType[]>(templateAtivos);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const theme = useTheme();

  useEffect(() => {
    request<TemplateType[]>(URL_TEMPLATE, MethodsEnum.GET, setTemplateAtivo);
  }, []);

  useEffect(() => {
    setTemplatesFiltered(templateAtivos);
    setOriginalTemplates(templateAtivos);
  }, [templateAtivos]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase(); // Convertendo para minúsculas
    setSearchValue(value);
    if (value === '') {
      setTemplatesFiltered(originalTemplates);
    } else {
      const filteredTemplates = originalTemplates.filter(template => template.name.toLowerCase().includes(value)); // Convertendo para minúsculas
      setTemplatesFiltered(filteredTemplates);
    }
    setCurrentPage(1); // Reset current page to 1 on search
  };


  const handleDownloadTemplate = (template: TemplateType) => {

   axios.post(URL_TEMPLATE_DOWNLOAD,template, { responseType: 'blob' })
    .then((response) => {
      console.log(response)
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${template.name}.${template.extensao}`;
      link.click();

      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.log(error);
    });
 
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const handlePageChange = (event:any, page:any) => {
    setCurrentPage(page);
  };

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentTemplates = templatesFiltered.slice(firstIndex, lastIndex);

  const totalPages = Math.ceil(templatesFiltered.length / itemsPerPage);

  return (
    <>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <Header title="Meus templates" icon={<TableChartOutlinedIcon sx={{ color: theme.palette.primary.contrastText, fontSize: 60 }} />}>
          <Button variant="contained" onClick={handleOnClickInsert}>Cadastrar</Button>
        </Header>

        <TabContext value={value}>
          <Box sx={{ borderColor: 'divider', display: "flex", justifyContent: "space-between",alignItems: "center"}}>
            <TabList onChange={handleChange} aria-label="lab API tabs example"
              textColor="secondary"
                sx={{
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#43a047",
                  },
                }}
              >
                <Tab label="Ativos" value="1"/>
                <Tab label="Pendentes" value="2" />
              </TabList>
            </Box>
          <TabPanel value="1">
              <TextField
                label="Search Templates"
                variant="outlined"
                value={searchValue}
                onChange={handleSearchChange}
              />
            <Grid container spacing={2}>
                
              {currentTemplates.map((template, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <MPaper>
                    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                      <Typography variant="body1">{template.name}</Typography>
                      <Typography variant="body1">Extensão: {template.extensao}</Typography>
                      <Typography variant="body1">Criado em: {template.createdAt}</Typography>
                      <Typography variant="body1">Status: {template.status}</Typography>
                      <Typography variant="body1">Número de campos: {template.campo.length}</Typography>
                      <Button
                        variant="contained"
                        onClick={() => handleDownloadTemplate(template)}
                      >
                        Download
                      </Button>
                    </Box>
                  </MPaper>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
            <Stack spacing={2}>
              <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
            </Stack>
            </Box>
          </TabPanel>
          <TabPanel value="2">
              <TemplatePendente />
        </TabPanel>
        </TabContext>
      </Box>
    </>
  );
}

export default Templates;