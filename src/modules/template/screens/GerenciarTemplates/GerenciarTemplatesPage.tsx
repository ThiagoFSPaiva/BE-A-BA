import { Box, FormControl, InputAdornment, InputLabel, MenuItem, Pagination, Select, Stack, Switch, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, useTheme } from "@mui/material";
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
import SearchIcon from '@mui/icons-material/Search';
import TPaper from "../../../../components/common/TPaper";

export const GerenciarTemplatesPage = () => {
    const theme = useTheme();
    const [page, setPage] = useState(1);
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

    const handleChangePage = (event: any, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1);
    };

    const handleSearch = (event: any) => {
        setSearchText(event.target.value);
        setPage(1);
    };

    const handleSearchByChange = (event: any) => {
        setSearchBy(event.target.value as string);
        setPage(1);
    };

    const handleFormatFilterChange = (event: any) => {
        setFormatFilter(event.target.value as string);
        setPage(1);
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


    const lastIndex = page * rowsPerPage;
    const firstIndex = lastIndex - rowsPerPage;
    const filteredRowsAtual = filteredRows.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);




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
                    <Box >
                        <TableContainer component={TPaper}>
                            <Box sx={{
                                display: "flex",
                                justifyContent: 'space-between',
                                p: 2,
                                borderBottom: "1px solid white"
                            }}>
                                <Stack direction="row" spacing={2}>

                                    <TextField
                                        value={searchText}
                                        onChange={handleSearch}
                                        placeholder="Search"
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <SearchIcon sx={{ color: "white" }} />
                                                </InputAdornment>
                                            ),
                                        }}

                                    />
                                    <Select
                                        value={searchBy}
                                        onChange={handleSearchByChange}
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
                                </Stack>

                                <Stack direction="row" gap="10px" marginRight="10px" alignItems="center" spacing={2}>
                                    Mostrar
                                    <Select
                                        labelId="rows-per-page-label"
                                        id="rows-per-page"
                                        value={rowsPerPage}
                                        onChange={handleChangeRowsPerPage}
                                    >
                                        <MenuItem value={10}>10</MenuItem>
                                        <MenuItem value={100}>100</MenuItem>
                                        <MenuItem value={filteredRows.length}>Todos</MenuItem>
                                    </Select>


                                </Stack>

                            </Box>

                            <Table sx={{ minWidth: 300 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Nome</TableCell>
                                        <TableCell align="center">Autor</TableCell>
                                        <TableCell align="center">Data de criação</TableCell>
                                        <TableCell align="center">Extensão</TableCell>
                                        <TableCell align="center">Status</TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredRowsAtual
                                        .map((row, index) => (
                                            <TableRow
                                                key={index}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="center">{row.autor}</TableCell>
                                                <TableCell align="center">{row.createdAt}</TableCell>
                                                <TableCell align="center">{row.extensao}</TableCell>
                                                <TableCell align="center">{row.status}</TableCell>
                                                <TableCell align="center">
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
                            <Pagination color="secondary" siblingCount={0} count={totalPages} page={page} onChange={handleChangePage} />
                        </Box>

                        {/* <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                            <TablePagination
                                component="div"
                                count={filteredRows.length}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`}
                                rowsPerPageOptions={[]}
                            />
                        </Box> */}


                    </Box>
                </TabPanel>
                <TabPanel sx={{ p: 0, pys: 2 }} value="2">
                </TabPanel>
                <TabPanel sx={{ p: 0, pys: 2 }} value="3">
                </TabPanel>
            </TabContext>


        </>

    )
}