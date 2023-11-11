import { useEffect, useState } from "react";
import { useUserReducer } from "../../../../store/reducers/userReducer/useUserReducer"
import { useRequests } from "../../../../shared/hooks/useRequests";
import { MethodsEnum } from "../../../../shared/enums/methods.enum";
import { UserType } from "../../../login/types/UserType";
import { useNavigate } from "react-router-dom";
import { UsuarioRoutesEnum } from "../routes";
import { URL_UPLOAD_GET_ALL_USERS } from "../../../../shared/constants/urls";

export const useUser = () => {
    const { users, setUsers } = useUserReducer();
    const navigate = useNavigate();
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [searchBy, setSearchBy] = useState('nome');
    const { request } = useRequests();


    useEffect(() => {
        request<UserType[]>(URL_UPLOAD_GET_ALL_USERS, MethodsEnum.GET, setUsers);
    }, []);

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

    const handleOnClickInsert = () => {
        navigate(UsuarioRoutesEnum.USUARIO_INSERT);
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


    const filteredRows = users.filter((row) => filterRows(row, searchText, searchBy));

    const lastIndex = page * rowsPerPage;
    const firstIndex = lastIndex - rowsPerPage;
    const usersFiltered = filteredRows.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);


    return {
        totalPages,
        usersFiltered,
        rowsPerPage,
        page,
        searchText,
        searchBy,
        handleChangeRowsPerPage,
        handleChangePage,
        handleSearchByChange,
        handleSearch,
        handleOnClickInsert

    };
}