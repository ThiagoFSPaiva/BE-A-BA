import { Box, MenuItem, Select, Switch, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, useTheme } from "@mui/material";
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined';
import { useEffect, useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import TabList from "@mui/lab/TabList";
import React from "react";
import { TemplateType } from "../../types/TemplateType";
import { MethodsEnum } from "../../../../shared/enums/methods.enum";
import { Header } from "../../../../components/common/Header";
import { useRequests } from "../../../../shared/hooks/useRequests";
import MPaper from "../../../../components/common/MPaper";


export const GerenciarTemplatesPage = () => {
    const theme = useTheme();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [value, setValue] = React.useState('1');
    const [searchText, setSearchText] = useState('');
    const [searchBy, setSearchBy] = useState('nome');
    const [formatFilter, setFormatFilter] = useState('all');
    const [templateAdmin, setTemplateAdmin] = useState<TemplateType[]>([]);
    const { request } = useRequests();

    useEffect(() => {
        request<TemplateType[]>('http://localhost:3000/template/ativos', MethodsEnum.GET, setTemplateAdmin);
    }, []);


    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = (event: any) => {
        setSearchText(event.target.value);
        setPage(0);
    };

    const handleSearchByChange = (event: any) => {
        setSearchBy(event.target.value as string);
        setPage(0);
    };

    const handleFormatFilterChange = (event: any) => {
        setFormatFilter(event.target.value as string);
        setPage(0);
    };

    const filteredRows = templateAdmin.filter((row) => {
        if (formatFilter !== 'all' && row.extensao !== formatFilter) return false;

        if (searchText === '') return true;

        if (searchBy === 'nome' && row.name.toLowerCase().includes(searchText.toLowerCase())) {
            return true;
        } else if (searchBy === 'autor' && row.autor.toLowerCase().includes(searchText.toLowerCase())) {
            return true;
        }

        return false;
    });




    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const newStatus = event.target.checked ? 'ativo' : 'inativo';

        fetch(`http://localhost:3000/template/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
        })
          .then((response) => response.json())
          .then((data) => {

          })
          .catch((error) => {
            console.error('Erro ao atualizar o status:', error);
          });
      };

      
    
      
      
    
    return (

        <>

            <Header title="Gerenciar Templates" icon={<DashboardCustomizeOutlinedIcon sx={{ color: theme.palette.primary.contrastText, fontSize: 60 }} />}>
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
                        <Tab label="Inativo" value="3" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Box >
                        <TableContainer component={MPaper}>
                            <TextField
                                value={searchText}
                                onChange={handleSearch}
                                placeholder="Search"
                                style={{ marginLeft: 10 }}
                            />
                            <Select
                                value={searchBy}
                                onChange={handleSearchByChange}
                                style={{ marginLeft: 10 }}
                            >
                                <MenuItem value="nome">Nome</MenuItem>
                                <MenuItem value="autor">Autor</MenuItem>
                            </Select>
                            <Select
                                value={formatFilter}
                                onChange={handleFormatFilterChange}
                                style={{ marginLeft: 10 }}
                            >
                                <MenuItem value="all">Todos</MenuItem>
                                <MenuItem value="csv">CSV</MenuItem>
                                <MenuItem value="xls">XLS</MenuItem>
                                <MenuItem value="xlsx">XLSX</MenuItem>
                            </Select>
                            <Table sx={{ minWidth: 300 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nome</TableCell>
                                        <TableCell align="right">Autor</TableCell>
                                        <TableCell align="right">Data de criação</TableCell>
                                        <TableCell align="right">Extensão</TableCell>
                                        <TableCell align="right">Status</TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredRows
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => (
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="right">{row.autor}</TableCell>
                                                <TableCell align="right">{row.createdAt}</TableCell>
                                                <TableCell align="right">{row.extensao}</TableCell>
                                                <TableCell align="right">{row.status}</TableCell>
                                                <TableCell align="right">
                                                    <Switch
                                                        defaultChecked={row.status === 'ativo'}
                                                        onChange={(event) => handleSwitchChange(event, row.id)}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                            <TablePagination
                                component="div"
                                count={filteredRows.length} // Replace with the total number of rows in your data
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                rowsPerPageOptions={[10, 100, filteredRows.length]} // Add the options for rows per page
                            />
                        </Box>


                    </Box>
                </TabPanel>
                <TabPanel value="2">
                </TabPanel>
                <TabPanel value="3">
                </TabPanel>
            </TabContext>


        </>

    )
}