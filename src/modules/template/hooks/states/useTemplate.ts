import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TemplateType } from "../../types/TemplateType";
import { useRequests } from "../../../../shared/hooks/useRequests";
import { URL_MYTEMPLATES_PENDENTES, URL_TEMPLATE } from "../../../../shared/constants/urls";
import { MethodsEnum } from "../../../../shared/enums/methods.enum";
import { useTemplateReducer } from "../../../../store/reducers/templateReducer/useTemplateReducer";
import { TemplateRoutesEnum } from "../../routes";

export const useTemplate = () => {

    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const { templateAtivos, setTemplateAtivo,meusTemplates,setMeusTemplates} = useTemplateReducer();
    const [templatesFiltered, setTemplatesFiltered] = useState<TemplateType[]>(templateAtivos);
    const [currentPage, setCurrentPage] = useState(1);
    const { request } = useRequests();
    const itemsPerPage = 9;
  
  
    useEffect(() => {
      setTemplatesFiltered(templateAtivos);
    }, [templateAtivos]);
  
    useEffect(() => {
      request<TemplateType[]>(URL_MYTEMPLATES_PENDENTES, MethodsEnum.GET, setMeusTemplates);
      request<TemplateType[]>(URL_TEMPLATE, MethodsEnum.GET, setTemplateAtivo);
    }, []);
  
  
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value.toLowerCase(); // Convertendo para minúsculas
      setSearchValue(value);
      if (value === '') {
        setTemplatesFiltered(templateAtivos);
      } else {
        const filteredTemplates = templateAtivos.filter(template => template.name.toLowerCase().includes(value)); // Convertendo para minúsculas
        setTemplatesFiltered(filteredTemplates);
      }
      setCurrentPage(1);
    };
  
  
    const handlePageChange = (event:any, page:any) => {
      setCurrentPage(page);
    };
  
    const lastIndex = currentPage * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentTemplates = templatesFiltered.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(templatesFiltered.length / itemsPerPage);

    const handleOnClickInsert = () => {
        navigate(TemplateRoutesEnum.TEMPLATE_INSERT);
    };
    


    return {
      currentPage,
      currentTemplates,
      totalPages,
      searchValue,
      handleSearchChange,
      handlePageChange,
      handleOnClickInsert,
      meusTemplates,

    };
}

