import { TemplateType } from "../../types/TemplateType";
import { Box, Grid, Typography } from "@mui/material";
import MPaper from "../../../../components/common/MPaper";

interface TemplatePendenteProps {
  meusTemplates: TemplateType[];
}

export const TemplatePendente: React.FC<TemplatePendenteProps> = ({ meusTemplates }) => {

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