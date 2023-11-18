import { Box, IconButton, InputAdornment, Menu, MenuItem, Pagination, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { useGerenciarAtivos } from "../../../hooks/GerenciarTemplates/states/useGerenciarAtivo";
import TPaper from "../../../../../components/common/TPaper";
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useMenu } from "../../../hooks/GerenciarTemplates/useMenu";
import { DeleteConfirmationModal } from "../../../components/DeleteConfirmationModal";

export const GerenciarAtivos = () => {
    const {
        anchorEl,
        selectedItemId,
        isDeleteDialogOpen,
        handleEditTemplate,
        handleDelete,
        handleDeactivate,
        handleMenuClose,
        handleMenuOpen,
        handleDeleteConfirm,
        handleDeleteCancel,
    } = useMenu();
    const {
        totalPages,
        currentTemplates,
        formatFilter,
        rowsPerPage,
        page,
        searchText,
        searchBy,
        templatesAtivos,
        handleFormatFilterChange,
        handleChangeRowsPerPage,
        handleChangePage,
        handleSearchByChange,
        handleSearch,
    } = useGerenciarAtivos();

    return (
        <>

            <DeleteConfirmationModal
                isOpen={isDeleteDialogOpen}
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
            >
                <Typography variant="subtitle1" color={theme => theme.palette.text.secondary}>
                    Ao excluir um template, todos os uploads associados serão apagados permanentemente.
                </Typography>
            </DeleteConfirmationModal>



            <TableContainer component={TPaper}>
                <Box sx={{
                    display: "flex",
                    justifyContent: 'space-between',
                    p: 2,
                    borderBottom: "1px solid #ccc"
                }}>
                    <Stack direction="row" spacing={2}>

                        <TextField
                            value={searchText}
                            onChange={handleSearch}
                            placeholder="Pesquisar"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon />
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
                            <MenuItem value={templatesAtivos.length}>Todos</MenuItem>
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
                        {currentTemplates
                            .map((row, index) => (
                                <TableRow
                                    key={index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Typography noWrap>{row.name}</Typography>
                                    </TableCell>
                                    <TableCell align="center"><Typography noWrap>{row.autor}</Typography></TableCell>
                                    <TableCell align="center"><Typography noWrap>{row.createdAt}</Typography></TableCell>
                                    <TableCell align="center"><Typography noWrap>{row.extensao}</Typography></TableCell>
                                    <TableCell align="center"><Typography noWrap variant="subtitle2" sx={{ color: "#fff", bgcolor: "#238527", borderRadius: 1 }}>{row.status}</Typography></TableCell>
                                    <TableCell align="center">

                                        <IconButton sx={{ color: "#8d8d8d" }} onClick={(event) => handleMenuOpen(event, row.id)}>
                                            <MoreVertIcon />
                                        </IconButton>

                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl && selectedItemId === row.id)}
                                            onClose={handleMenuClose}
                                        >
                                            <MenuItem onClick={() => handleDeactivate(row.id)}>
                                                Desativar
                                            </MenuItem>
                                            <MenuItem onClick={() => handleEditTemplate(row.id)}>
                                                Editar
                                            </MenuItem>
                                            <MenuItem onClick={() => handleDelete(row.id)}>
                                                Excluir
                                            </MenuItem>
                                        </Menu>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Pagination color="secondary" siblingCount={0} count={totalPages} page={page} onChange={handleChangePage} />
            </Box>



        </>
    )



}