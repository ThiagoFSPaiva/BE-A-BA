import { useEffect, useState } from "react";
import { useTemplateAdminReducer } from "../../../../../store/reducers/templateAdminReducer/useTemplateAdminReducer";
import { TemplateType } from "../../../types/TemplateType";
import { useRequests } from "../../../../../shared/hooks/useRequests";
import { MethodsEnum } from "../../../../../shared/enums/methods.enum";
import { URL_TEMPLATEADMIN_INATIVO } from "../../../../../shared/constants/urls";

export const useGerenciarInativos = () => {
    const { templatesInativos,setTemplatesInativos} = useTemplateAdminReducer();
    const [templatesFiltered, setTemplatesFiltered] = useState<TemplateType[]>(templatesInativos);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [searchBy, setSearchBy] = useState('nome');
    const [formatFilter, setFormatFilter] = useState('all');
    const { request } = useRequests();


    useEffect(() => {
        setTemplatesFiltered(templatesInativos);
      }, [templatesInativos]);


    useEffect(() => {
    request<TemplateType[]>(URL_TEMPLATEADMIN_INATIVO, MethodsEnum.GET, setTemplatesInativos);
    }, []);

    const handleChangePage = (event: any, newPage: number) => {
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

    const handleFormatFilterChange = (event: any) => {
        setFormatFilter(event.target.value as string);
        setPage(1);
    };

    const filteredRows = templatesFiltered.filter((row) => {
        if (formatFilter !== 'all' && row.extensao !== formatFilter) return false;

        if (searchText === '') return true;

        if (searchBy === 'nome' && row.name.toLowerCase().includes(searchText.toLowerCase())) {
            return true;
        } else if (searchBy === 'autor' && row.autor.toLowerCase().includes(searchText.toLowerCase())) {
            return true;
        }

        return false;
    });


    const lastIndex = page * rowsPerPage;
    const firstIndex = lastIndex - rowsPerPage;
    const currentTemplates = filteredRows.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);


    return {
        totalPages,
        currentTemplates,
        rowsPerPage,
        page,
        searchText,
        searchBy,
        formatFilter,
        handleFormatFilterChange,
        handleChangeRowsPerPage,
        handleChangePage,
        handleSearchByChange,
        handleSearch
    };

}