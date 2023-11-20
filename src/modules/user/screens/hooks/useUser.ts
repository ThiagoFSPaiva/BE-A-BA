import { useState } from "react";
import { UserType } from "../../../login/types/UserType";

export const useUser = (usersFiltered: UserType[]) => {
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [searchBy, setSearchBy] = useState('nome');


    const handleChangePage = (event: any| null, newPage: number) => {
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


    const filterRows = (row: UserType, searchText: string, searchBy: string) => {
        if (!searchText) return true;

        const text = searchText.toLowerCase();
        switch (searchBy) {
            case 'nome':
                return row.name.toLowerCase().trim().includes(text);
            case 'matricula':
                return row.matricula.toLowerCase().trim().includes(text);
            case 'cpf':
                return row.cpf.toLowerCase().trim().includes(text);
            case 'email':
                return row.email.toLowerCase().trim().includes(text);
            default:
                return false;
        }
    };


    const filteredRows = usersFiltered.filter((row) => filterRows(row, searchText, searchBy));

    const lastIndex = page * rowsPerPage;
    const firstIndex = lastIndex - rowsPerPage;
    const currentUsers = filteredRows.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);


    return {
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
    };
}