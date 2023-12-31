
import { Box, MenuItem, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, useTheme, IconButton, InputAdornment, Pagination } from "@mui/material";
import { Header } from "../../../components/common/Header";
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import TPaper from "../../../components/common/TPaper";
import SearchIcon from '@mui/icons-material/Search';
import { useUpload } from "../hooks/useUpload";

const fileNameStyle = {
    maxWidth: '200px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
};

export const UploadsPage = () => {
    const theme = useTheme();
    const {
        totalPages,
        uploadsFiltered,
        rowsPerPage,
        page,
        searchText,
        searchBy,
        handleChangeRowsPerPage,
        handleChangePage,
        handleSearchByChange,
        handleSearch,
        handleDownload
    } = useUpload();



    return (
        <>
            <Header
                title="Uploads"
                description="Visualize todos os uploads realizados, podendo realizar download do arquivo"
                icon={<UploadFileOutlinedIcon sx={{ color: theme.palette.primary.contrastText, fontSize: 60 }} />}></Header>

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
                            placeholder="Pesquisar"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon/>
                                    </InputAdornment>
                                ),
                            }}

                        />
                        <Select value={searchBy} onChange={handleSearchByChange} style={{ marginLeft: 10 }}>
                            <MenuItem value="nomeTemplate">Template</MenuItem>
                            <MenuItem value="nomeArquivo">Arquivo</MenuItem>
                            <MenuItem value="autor">Autor</MenuItem>
                            <MenuItem value="matricula">Matricula</MenuItem>
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
                            <MenuItem value={uploadsFiltered.length}>Todos</MenuItem>
                        </Select>
                    </Stack>

                </Box>
                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><Typography variant="subtitle2" color={theme => theme.palette.text.secondary}>Nome</Typography></TableCell>
                            <TableCell align="center"><Typography variant="subtitle2" color={theme => theme.palette.text.secondary}>Autor</Typography></TableCell>
                            <TableCell align="center"><Typography variant="subtitle2" color={theme => theme.palette.text.secondary}>Matricula</Typography></TableCell>
                            <TableCell align="center"><Typography variant="subtitle2" color={theme => theme.palette.text.secondary}>Data de criação</Typography></TableCell>
                            <TableCell align="center"><Typography variant="subtitle2" color={theme => theme.palette.text.secondary}>Extensão</Typography></TableCell>
                            <TableCell align="center"><Typography variant="subtitle2" color={theme => theme.palette.text.secondary}>Template</Typography></TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {uploadsFiltered
                            .map((row) => (
                                <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="right">
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: "center" }}>
                                            <Stack direction="row" spacing={2} sx={fileNameStyle}>
                                                <Typography variant="subtitle2" fontWeight={700} noWrap>{row.nomeArquivo}</Typography>
                                            </Stack>
                                            <Stack direction="row" spacing={2}>
                                                <IconButton color="secondary" aria-label="delete" onClick={() => handleDownload(row.id)}>
                                                    <FileDownloadIcon />
                                                </IconButton>
                                            </Stack>
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center"><Typography variant="subtitle2" noWrap color={theme => theme.palette.text.primary}>{row.user_name}</Typography></TableCell>
                                    <TableCell align="center"><Typography variant="subtitle2" noWrap color={theme => theme.palette.text.primary}>{row.matricula}</Typography></TableCell>
                                    <TableCell align="center"><Typography variant="subtitle2" noWrap color={theme => theme.palette.text.primary}>{row.created_at}</Typography></TableCell>
                                    <TableCell align="center"><Typography variant="subtitle2" noWrap color={theme => theme.palette.text.primary}>{row.extensao}</Typography></TableCell>
                                    <TableCell align="center"><Typography variant="subtitle2" noWrap >{row.template_name}</Typography></TableCell>
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Pagination color="secondary" siblingCount={0} count={totalPages} page={page} onChange={handleChangePage} />
            </Box>

        </>
    );
};