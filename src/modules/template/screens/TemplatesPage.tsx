import { useTheme } from "@mui/material";
import { Header } from "../../../components/common/Header";
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { userDataContext } from "../../../shared/hooks/useDataContext";
import { useEffect } from "react";
import { useRequests } from "../../../shared/hooks/useRequests";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { TemplateType } from "../types/TemplateType";
import { URL_TEMPLATE } from "../../../shared/constants/urls";

export const Templates = () => {
  const { template, setTemplate } = userDataContext();
  const { request } = useRequests();

  useEffect(() => {
    request<TemplateType[]>(URL_TEMPLATE,MethodsEnum.GET,setTemplate)
      .then((response) => {
        console.log(response)
      })
  },[])


  const theme = useTheme();

  return (
    <>
      <Header title="Meus templates" icon={<TableChartOutlinedIcon sx={{color: theme.palette.primary.contrastText ,fontSize: 60}} />}>
      </Header>

      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {template && template.length > 0 ? (
        template.map((template) => (
          <div key={template.id} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', margin: '10px' }}>
            <h3>{template.name}</h3>
            <p><strong>Extensão:</strong> {template.extensao}</p>
            <p><strong>Extensão:</strong> {template.status}</p>
            <p><strong>Criado em:</strong> {template.createdAt}</p>
            <p><strong>Campos:</strong>{template.campo.length}</p>
          </div>
        ))
      ) : (
        <p>Nenhum template encontrado.</p>
      )}
    </div>
    
    
    </>
    
  )
}

export default Templates;
