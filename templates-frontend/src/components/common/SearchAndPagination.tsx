import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Select,
  MenuItem,
} from '@mui/material';

interface Column {
  field: string;
  headerName: string;
}

interface SearchAndPaginationProps {
  searchText: string;
  setSearchText: (text: string) => void;
  searchBy: string;
  setSearchBy: (searchField: string) => void;
  data: any[];
  columns: Column[];
}

const SearchAndPagination: React.FC<SearchAndPaginationProps> = ({
  searchText,
  setSearchText,
  searchBy,
  setSearchBy,
  data,
  columns,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
    setPage(0);
  };

  const handleSearchByChange = (event: any) => {
    setSearchBy(event.target.value as string);
    setPage(0);
  };

  return (
    <>
      {/* Componente de pesquisa */}
      <TextField value={searchText} onChange={handleSearchTextChange} placeholder="Search" style={{ marginLeft: 10 }} />
      <Select value={searchBy} onChange={handleSearchByChange} style={{ marginLeft: 10 }}>
        {columns.map((column) => (
          <MenuItem value={column.field} key={column.field}>
            {column.headerName}
          </MenuItem>
        ))}
      </Select>

      {/* Tabela de dados */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.field}>{column.headerName}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={column.field}>{row[column.field]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Paginação */}
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default SearchAndPagination;