import { Typography,useTheme } from "@mui/material";
import { Header } from "../../../components/common/Header";
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { useEffect, useState } from "react";
import axios from "axios";
import { useRequests } from "../../../shared/hooks/useRequests";
import { userGlobalContext } from "../../../shared/hooks/useGlobalContext";


interface Template {
  id: number;
  name: string;
  extensao: string;
  campo: { name: string; tipo: string }[];
  status: string;
  createdAt: string;
}


export const Templates = () => {

  // const {user} = userGlobalContext();
  // const [templates, setTemplates] = useState<Template[]>([]);

  // useEffect(() => {
  //   const template = getRequest('http://localhost:3000/template/listar-templates-por-id');

  //   console.log(template)
  // }, []);

  const theme = useTheme();

  return (
    <>
      <Header title="Meus templates" icon={<TableChartOutlinedIcon sx={{color: theme.palette.primary.contrastText ,fontSize: 60}} />}>
      </Header>

      {/* <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {templates && templates.length > 0 ? (
        templates.map((template) => (
          <div key={template.id} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', margin: '10px' }}>
            <h3>{template.name}</h3>
            <p><strong>Extensão:</strong> {template.extensao}</p>
            <p><strong>Extensão:</strong> {template.status}</p>
            <p><strong>Criado em:</strong> {template.createdAt}</p>
          </div>
        ))
      ) : (
        <p>Nenhum template encontrado.</p>
      )}
    </div> */}
    
    
    </>
    
  )
}

export default Templates;