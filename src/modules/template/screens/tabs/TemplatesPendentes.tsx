import { useEffect } from "react";
import { MethodsEnum } from "../../../../shared/enums/methods.enum";
import { useRequests } from "../../../../shared/hooks/useRequests";
import { useTemplateReducer } from "../../../../store/reducers/templateReducer/useTemplateReducer";
import { TemplateType } from "../../types/TemplateType";
import { URL_MYTEMPLATES_PENDENTES } from "../../../../shared/constants/urls";
import { Box, Grid, Typography } from "@mui/material";
import MPaper from "../../../../components/common/MPaper";

export const TemplatePendente = () => {

    const { meusTemplates, setMeusTemplates } = useTemplateReducer();
    const { request } = useRequests();

    useEffect(() => {
            request<TemplateType[]>(URL_MYTEMPLATES_PENDENTES, MethodsEnum.GET, setMeusTemplates);
    }, []);

    return(
        <Grid container spacing={2}>
        {meusTemplates.map((template,index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <MPaper>
              <Box sx={{display: "flex",justifyContent: "center", alignItems: "center", flexDirection: "column"}}>
                <Typography variant="body1">{template.name}</Typography>
                <Typography variant="body1">Extensão: {template.extensao}</Typography>
                <Typography variant="body1">Criado em: {template.createdAt}</Typography>
                <Typography variant="body1">Status: {template.status}</Typography>
                <Typography variant="body1">Número de campos: {template.campo.length}</Typography>
              </Box>
            </MPaper>
          </Grid>
        ))}
      </Grid>
    )
}