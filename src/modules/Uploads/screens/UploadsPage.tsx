import { useState, useEffect } from "react";
import { Box, MenuItem, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Typography, useTheme, IconButton } from "@mui/material";
import { Header } from "../../../components/common/Header";
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import MPaper from "../../../components/common/MPaper";
import { useRequests } from "../../../shared/hooks/useRequests";
import { UploadType } from "../types/UploadType";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import axios from "axios";
import { URL_UPLOAD_DOWNLOAD } from "../../../shared/constants/urls";
import { DownloadType } from "../types/downloadType";

const fileNameStyle = {
    maxWidth: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
};

export const UploadsPage = () => {
    const theme = useTheme();
    const { request } = useRequests();

    const [searchText, setSearchText] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchBy, setSearchBy] = useState('nome');
    const [upload, setUpload] = useState<UploadType[]>([]);

    useEffect(() => {
        request<UploadType[]>('http://localhost:5000/getAllUploads', MethodsEnum.GET, setUpload);
    }, []);

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
        setPage(0);
    };

    const handleSearchByChange = (event: any) => {
        setSearchBy(event.target.value as string);
        setPage(0);
    };

    const handleDownload = (id: number) => {
        axios.post(URL_UPLOAD_DOWNLOAD,id).
        then((response) => {
            const link = document.createElement('a');
            link.href = response.data.url;
            link.click();
        })
    };

    const filterRows = (row: UploadType, searchText: string, searchBy: string) => {
        if (!searchText) return true;
      
        const text = searchText.toLowerCase();
        switch (searchBy) {
            case 'nome':
                return row.nomeArquivo.toLowerCase().includes(text);
            case 'autor':
                return row.user_name.toLowerCase().includes(text);
            case 'matricula':
                return row.matricula.toLowerCase().includes(text);
            default:
                return false;
        }
    };
      
    const filteredRows = upload.filter((row) => filterRows(row, searchText, searchBy));

    return (
        <>
            <Header title="Uploads" icon={<UploadFileOutlinedIcon sx={{ color: theme.palette.primary.contrastText, fontSize: 60 }} />}></Header>
            <Box sx={{ p: 4 }}>
                <TableContainer component={MPaper}>
                    <Box sx={{ display: "flex", justifyContent: 'space-between' }}>
                        <Stack direction="row" spacing={2}>
                            <TextField value={searchText} onChange={handleSearch} placeholder="Search" style={{ marginLeft: 10 }} />
                            <Select value={searchBy} onChange={handleSearchByChange} style={{ marginLeft: 10 }}>
                                <MenuItem value="nome">Nome</MenuItem>
                                <MenuItem value="autor">Autor</MenuItem>
                                <MenuItem value="matricula">Matricula</MenuItem>
                            </Select>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <TablePagination
                                component="div"
                                count={filteredRows.length}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                rowsPerPageOptions={[10, 100, filteredRows.length]}
                            />
                        </Stack>
                    </Box>
                    <Table sx={{ minWidth: 300 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell align="right">Autor</TableCell>
                                <TableCell align="right">Matricula</TableCell>
                                <TableCell align="right">Data de criação</TableCell>
                                <TableCell align="right">Extensão</TableCell>
                                <TableCell align="right">Template</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredRows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                    <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                        <TableCell align="right">
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                                                <Stack direction="row" spacing={2} sx={fileNameStyle}>
                                                    <Typography>{row.nomeArquivo}</Typography>
                                                </Stack>
                                                <Stack direction="row" spacing={2}>
                                                    <IconButton aria-label="delete" onClick={() => handleDownload(row.id)}>
                                                        <FileDownloadIcon />
                                                    </IconButton>
                                                </Stack>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right">{row.user_name}</TableCell>
                                        <TableCell align="right">{row.matricula}</TableCell>
                                        <TableCell align="right">{row.created_at}</TableCell>
                                        <TableCell align="right">{row.extensao}</TableCell>
                                        <TableCell align="right">{row.template_name}</TableCell>
                                        <TableCell align="right"></TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};