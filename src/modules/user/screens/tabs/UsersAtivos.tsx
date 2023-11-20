import { Box, InputAdornment, MenuItem, Pagination, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import TPaper from "../../../../components/common/TPaper"
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import { UserType } from "../../../login/types/UserType";
import { useUserReducer } from "../../../../store/reducers/userReducer/useUserReducer";
import { useUser } from "../hooks/useUser";

export const UsersAtivos = () => {

    const { users } = useUserReducer();
    const [usersFiltered, setUsersFiltered] = useState<UserType[]>(users);

    useEffect(() => {
        const usersAtivos = users.filter(user => user.status === 'ativo');
        
        setUsersFiltered(usersAtivos);
      }, [users]);

    const {
        totalPages,
        currentUsers,
        rowsPerPage,
        page,
        searchText,
        searchBy,
        handleChangeRowsPerPage,
        handleChangePage,
        handleSearchByChange,
        handleSearch,

    } = useUser(usersFiltered);

    return (
        <>
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
                                        <SearchIcon sx={{ color: "white" }} />
                                    </InputAdornment>
                                ),
                            }}

                        />
                        <Select
                            value={searchBy}
                            onChange={handleSearchByChange}
                            style={{ marginLeft: 10 }}
                        >
                            <MenuItem value="nome">Nome</MenuItem>
                            <MenuItem value="matricula">Matricula</MenuItem>
                            <MenuItem value="cpf">CPF</MenuItem>
                            <MenuItem value="email">Email</MenuItem>
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
                            <MenuItem value={usersFiltered.length}>Todos</MenuItem>
                        </Select>
                    </Stack>
                </Box>
                <Table sx={{ minWidth: 300 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nome</TableCell>
                            <TableCell align="center">Matricula</TableCell>
                            <TableCell align="center">Email</TableCell>
                            <TableCell align="center">CPF</TableCell>
                            <TableCell align="center">Cargo</TableCell>
                            <TableCell align="center">status</TableCell>
                            <TableCell align="center"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentUsers.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="center">{row.matricula}</TableCell>
                                <TableCell align="center">{row.email}</TableCell>
                                <TableCell align="center">{row.cpf}</TableCell>
                                <TableCell align="center">{row.typeUser}</TableCell>
                                <TableCell align="center">{row.status}</TableCell>
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
    )


}
