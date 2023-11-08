import { Box, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, useTheme } from "@mui/material";
import { Header } from "../../../components/common/Header";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import MPaper from "../../../components/common/MPaper";
import { useEffect, useState } from "react";
import React from "react";
import { UserType } from "../../login/types/UserType";
import { useRequests } from "../../../shared/hooks/useRequests";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { getUserInfoByToken } from "../../../shared/functions/connection/auth";


export const UsuariosPage = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [value, setValue] = React.useState('1');
  const [searchText, setSearchText] = useState('');
  const [searchBy, setSearchBy] = useState('nome');
  const [userList, setUserlist] = useState<UserType[]>([]);
  const { request } = useRequests();

  useEffect(() => {
    request<UserType[]>('http://localhost:3000/user/getAllUsers', MethodsEnum.GET, setUserlist);
    console.log(getUserInfoByToken())
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


  const filteredRows = userList.filter((row) => {

    if (searchText === '') return true;

    if (searchBy === 'nome' && row.name.toLowerCase().includes(searchText.toLowerCase())) {
      return true;
    } else if (searchBy === 'matricula' && row.matricula.includes(searchText.toLowerCase())) {
      return true;
    }else if (searchBy == 'cpf' && row.cpf.includes(searchText)) {
      return true
    }
    

    return false;
  });


  return (

    <>

      <Header title="Usuários" icon={<PersonOutlineOutlinedIcon sx={{ color: theme.palette.primary.contrastText, fontSize: 60 }} />}>
      </Header>

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
            <MenuItem value="matricula">Matricula</MenuItem>
            <MenuItem value="cpf">CPF</MenuItem>
            <MenuItem value="email">Email</MenuItem>
          </Select>
          <Table sx={{ minWidth: 300 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell align="right">Matricula</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">CPF</TableCell>
                <TableCell align="right">Cargo</TableCell>
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
                    <TableCell align="right">{row.matricula}</TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.cpf}</TableCell>
                    <TableCell align="right">{row.typeUser}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
          <TablePagination
            component="div"
            count={filteredRows.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[10, 100, filteredRows.length]}
          />
        </Box>


      </Box>

    </>

  )
}

