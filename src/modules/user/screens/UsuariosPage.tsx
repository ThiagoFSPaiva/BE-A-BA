import { Box, Button, InputAdornment, MenuItem, Pagination, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, useTheme } from "@mui/material";
import { Header } from "../../../components/common/Header";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { useUser } from "./hooks/useUser";
import { UsuarioRoutesEnum } from "./routes";
import { useNavigate } from "react-router-dom";
import TPaper from "../../../components/common/TPaper";


export const UsuariosPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleGoToInsertAdmin = () => {
    navigate(UsuarioRoutesEnum.USUARIO_INSERT);
  };

  const {
    rowsPerPage,
    totalPages,
    usersFiltered,
    page,
    searchText,
    searchBy,
    handleChangeRowsPerPage,
    handleChangePage,
    handleSearch,
    handleSearchByChange
  } = useUser();

  return (

    <>

      <Header
        title="Usuários"
        description="Visualize e gerencie todos templates, podendo ativar ou desativar cada um."
        icon={<PersonOutlineOutlinedIcon sx={{ color: theme.palette.primary.contrastText, fontSize: 60 }} />}>
        <Button variant="contained" onClick={handleGoToInsertAdmin}>Cadastrar</Button>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {usersFiltered.map((row, index) => (
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

