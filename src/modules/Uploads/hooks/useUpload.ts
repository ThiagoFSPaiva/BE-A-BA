import { useUploadsReducer } from "../../../store/reducers/uploadReducer/useUploadReducer";
import { useEffect, useState } from "react";
import { useRequests } from "../../../shared/hooks/useRequests";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { URL_UPLOAD_DOWNLOAD, URL_UPLOAD_GET_ALL } from "../../../shared/constants/urls";
import { UploadType } from "../types/UploadType";
import { DownloadType } from "../types/DownloadType";

export const useUpload = () => {
    const { uploads, setUploads } = useUploadsReducer();
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [searchBy, setSearchBy] = useState('nomeTemplate');
    const { request } = useRequests();


    useEffect(() => {
        request<UploadType[]>(URL_UPLOAD_GET_ALL, MethodsEnum.GET, setUploads);
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


    const handleDownload = (id: number) => {
        request<DownloadType>(URL_UPLOAD_DOWNLOAD,MethodsEnum.POST,undefined, id)
        .then((response) => {
            if(response) {
                const link = document.createElement('a');
                link.href = response.url
                link.click();
            }
        })
    };

    const filterRows = (row: UploadType, searchText: string, searchBy: string) => {
        if (!searchText) return true;

        const text = searchText.toLowerCase();
        switch (searchBy) {
            case 'nomeArquivo':
                return row.nomeArquivo.toLowerCase().trim().includes(text);
            case 'nomeTemplate':
                return row.template_name.toLowerCase().trim().includes(text);
            case 'autor':
                return row.user_name.toLowerCase().trim().includes(text);
            case 'matricula':
                return row.matricula.toLowerCase().trim().includes(text);
            default:
                return false;
        }
    };


    const filteredRows = uploads.filter((row) => filterRows(row, searchText, searchBy));

    const lastIndex = page * rowsPerPage;
    const firstIndex = lastIndex - rowsPerPage;
    const uploadsFiltered = filteredRows.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);


    return {
        totalPages,
        uploadsFiltered,
        rowsPerPage,
        page,
        searchText,
        searchBy,
        handleDownload,
        handleChangeRowsPerPage,
        handleChangePage,
        handleSearchByChange,
        handleSearch,
    };
}