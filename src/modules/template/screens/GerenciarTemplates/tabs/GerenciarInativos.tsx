import { Box, IconButton, InputAdornment, Menu, MenuItem, Pagination, Select, Stack, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import TPaper from "../../../../../components/common/TPaper";
import SearchIcon from '@mui/icons-material/Search';
import { useGerenciarInativos } from "../../../hooks/GerenciarTemplates/states/useGerenciarInativo";
import { useRequests } from "../../../../../shared/hooks/useRequests";
import { MethodsEnum } from "../../../../../shared/enums/methods.enum";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useMenu } from "../../../hooks/GerenciarTemplates/useMenu";
import { DeleteConfirmationModal } from "../../../components/DeleteConfirmationModal";

export const GerenciarInativos = () => {
    const { request } = useRequests();
    const {
        totalPages,
        currentTemplates,
        formatFilter,
        rowsPerPage,
        page,
        searchText,
        searchBy,
        handleFormatFilterChange,
        handleChangeRowsPerPage,
        handleChangePage,
        handleSearchByChange,
        handleSearch
    } = useGerenciarInativos();
    const {
        anchorEl,
        selectedItemId,
        isDeleteDialogOpen,
        handleEdit,
        handleDelete,
        handleDeactivate,
        handleMenuClose,
        handleMenuOpen,
        handleActivate,
        handleDeleteConfirm,
        handleDeleteCancel,
    } = useMenu();


    return (
        <>

            <DeleteConfirmationModal
                isOpen={isDeleteDialogOpen}
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
            />

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
                            <MenuItem value={currentTemplates.length}>Todos</MenuItem>
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
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="center">{row.autor}</TableCell>
                                    <TableCell align="center">{row.createdAt}</TableCell>
                                    <TableCell align="center">{row.extensao}</TableCell>
                                    <TableCell align="center"><Typography variant="subtitle2" sx=
                                        {{
                                            color: "#fff",
                                            bgcolor: "#F44336",
                                            borderRadius: 1,
                                            width: "80px",
                                            margin: "auto"
                                        }}>
                                        {row.status}</Typography></TableCell>
                                    <TableCell align="center">

                                        <IconButton sx={{ color: "#8d8d8d" }} onClick={(event) => handleMenuOpen(event, row.id)}>
                                            <MoreVertIcon />
                                        </IconButton>

                                        <Menu
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl && selectedItemId === row.id)}
                                            onClose={handleMenuClose}
                                        >
                                            <MenuItem onClick={() => handleActivate(row.id)}>
                                                Ativar
                                            </MenuItem>
                                            <MenuItem onClick={() => handleDeactivate(row.id)}>
                                                Desativar
                                            </MenuItem>
                                            <MenuItem onClick={() => handleEdit(row.id)}>
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