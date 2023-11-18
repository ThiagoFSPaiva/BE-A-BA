import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TemplateType } from "../../types/TemplateType";
import { useRequests } from "../../../../shared/hooks/useRequests";
import { URL_TEMPLATE_ATIVO, URL_TEMPLATE_DOWNLOAD } from "../../../../shared/constants/urls";
import { MethodsEnum } from "../../../../shared/enums/methods.enum";
import { useTemplateReducer } from "../../../../store/reducers/templateReducer/useTemplateReducer";
import { TemplateRoutesEnum } from "../../routes";

export const useTemplate = () => {

  const navigate = useNavigate();
  const { templateAtivos, setTemplateAtivo } = useTemplateReducer();
  const [templatesFiltered, setTemplatesFiltered] = useState<TemplateType[]>(templateAtivos);
  const [rowsPerPage] = useState(9);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [searchBy] = useState('nome');
  const [formatFilter, setFormatFilter] = useState('all');
  const { request } = useRequests();


  useEffect(() => {
    setTemplatesFiltered(templateAtivos);
  }, [templateAtivos]);

  useEffect(() => {
    request<TemplateType[]>(URL_TEMPLATE_ATIVO, MethodsEnum.GET, setTemplateAtivo);
  }, []);


  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleSearch = (event: any) => {
    setSearchText(event.target.value);
    setPage(1);
  };


  const handleFormatFilterChange = (event: any) => {
    setFormatFilter(event.target.value as string);
    setPage(1);
  };

  const handleDownloadTemplate = (templateId: number) => {

    request<any>(`${URL_TEMPLATE_DOWNLOAD}${templateId}`, MethodsEnum.GET)
      .then((response) => {
        if (response) {
          const link = document.createElement('a');
          link.href = `${URL_TEMPLATE_DOWNLOAD}${templateId}`;
          link.click();
        }
      }).catch((error) => error)

  };



  const filteredRows = templatesFiltered.filter((row) => {
    if (formatFilter !== 'all' && row.extensao !== formatFilter) return false;

    if (searchText === '') return true;

    if (searchBy === 'nome' && row.name.toLowerCase().includes(searchText.toLowerCase())) {
      return true;
    }

    return false;
  });


  const lastIndex = page * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const currentTemplates = filteredRows.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  const handleOnClickInsert = () => {
    navigate(TemplateRoutesEnum.TEMPLATE_INSERT);
  };



  return {
    totalPages,
    currentTemplates,
    page,
    searchText,
    formatFilter,
    handleFormatFilterChange,
    handleChangePage,
    handleSearch,
    handleOnClickInsert,
    handleDownloadTemplate,
    templateAtivos,
  };
}

