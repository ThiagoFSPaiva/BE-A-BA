import { Box, Button, IconButton, InputAdornment, Menu, MenuItem, Pagination, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { Header } from "../../../components/common/Header"
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import TPaper from "../../../components/common/TPaper";
import SearchIcon from '@mui/icons-material/Search';
import { useCategory } from "../hooks/useCategory";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DeleteConfirmationModal } from "../../template/components/DeleteConfirmationModal";

export const CategoryPage = () => {
    const {
        page,
        totalPages,
        selectedItemId,
        categoriesFiltered,
        anchorEl,
        openModalDelete,
        handleMenuClose,
        handleOnChangeSearch,
        handleGoToEditCategory,
        handleOnClickCategory,
        handleChangePage,
        handleMenuOpen,
        handleOpenModalDelete,
        handleCloseModalDelete,
        handleConfirmDeleteCategory,

    } = useCategory();

    return (
        <>

            <DeleteConfirmationModal
                isOpen={openModalDelete}
                onConfirm={handleConfirmDeleteCategory}
                onCancel={handleCloseModalDelete}
            >
                <Typography variant="subtitle1" color={theme => theme.palette.text.secondary}>
                    Ao excluir uma categoria, todos os templates associados serão apagados permanentemente.
                </Typography>
            </DeleteConfirmationModal>


            <Header
                title="Categorias"
                description="Visualize e gerencie todas categorias, com opção de criar,editar ou excluir."
                icon={<LayersOutlinedIcon sx={{ color: theme => theme.palette.primary.contrastText, fontSize: 60 }} />}>
                <Button variant="contained" onClick={handleOnClickCategory}>Cadastrar</Button>
            </Header>

            <TableContainer component={TPaper}>
                <Box sx={{
                    display: "flex",
                    justifyContent: 'space-between',
                    p: 2,
                    borderBottom: "1px solid white"
                }}>
                    <Stack direction="row" spacing={2}>
                        <TextField
                            onChange={handleOnChangeSearch}
                            placeholder="Pesquisar"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon sx={{ color: "white" }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Stack>
                </Box>
                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left"><Typography variant="subtitle2" color={theme => theme.palette.text.secondary}>ID</Typography></TableCell>
                            <TableCell align="center"><Typography variant="subtitle2" color={theme => theme.palette.text.secondary}>Nome</Typography></TableCell>
                            <TableCell align="center"><Typography variant="subtitle2" color={theme => theme.palette.text.secondary}>Total de templates</Typography></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categoriesFiltered.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="left"><Typography variant="subtitle2" noWrap color={theme => theme.palette.text.primary}>
                                    {row.id}</Typography>
                                </TableCell>
                                <TableCell align="center"><Typography variant="subtitle2" noWrap color={theme => theme.palette.text.primary}>
                                    {row.name}</Typography>
                                </TableCell>
                                <TableCell align="center"><Typography variant="subtitle2" noWrap color={theme => theme.palette.text.primary}>
                                    {row.amountTemplates}</Typography>
                                </TableCell>
                                <TableCell align="center">

                                    <IconButton sx={{ color: "#8d8d8d" }} onClick={(event) => handleMenuOpen(event, row.id)}>
                                        <MoreVertIcon />
                                    </IconButton>

                                    <Menu
                                        anchorEl={anchorEl}
                                        open={Boolean(anchorEl && selectedItemId === row.id)}
                                        onClose={handleMenuClose}
                                    >
                                        <MenuItem onClick={() => handleGoToEditCategory(row.id)}>
                                            Editar
                                        </MenuItem>
                                        <MenuItem onClick={() => handleOpenModalDelete(row.id)}>
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