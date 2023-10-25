import { TemplateType } from "../../types/TemplateType";
import { Button, Grid, Stack, Typography } from "@mui/material";
import MPaper from "../../../../components/common/MPaper";
import axios from "axios";
import { URL_TEMPLATE_DOWNLOAD } from "../../../../shared/constants/urls";

interface TemplatePendenteProps {
    currentTemplates: TemplateType[];
}

export const TemplatesAtivos: React.FC<TemplatePendenteProps> = ({ currentTemplates }) => {


    const handleDownloadTemplate = (template: TemplateType) => {

        axios.post(URL_TEMPLATE_DOWNLOAD, template, { responseType: 'blob' })
          .then((response) => {
            console.log(response)
            const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${template.name}.${template.extensao}`;
            link.click();
    
            window.URL.revokeObjectURL(url);
          })
          .catch((error) => {
            console.log(error);
          });
    
      };    

    return (
        <Grid container spacing={2}>
            {currentTemplates.length > 0 ? (
                currentTemplates.map((template, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <MPaper>
                            <Stack spacing={2} alignItems={"center"}>
                                <Typography variant="body1">{template.name}</Typography>

                                <Typography variant="body1">Criado em: {template.createdAt}</Typography>
                                <Typography variant="body1">Status: {template.status}</Typography>
                                <Stack direction="row" spacing={2}>
                                    <Stack alignItems="center" direction="column" spacing={2}>
                                        <Typography variant="body1">Extensão:</Typography>
                                        <Typography variant="body1">{template.extensao}</Typography>
                                    </Stack>
                                    <Stack alignItems="center" direction="column" spacing={2}>
                                        <Typography variant="body1">Campos:</Typography>
                                        <Typography variant="body1">{template.campo.length}</Typography>
                                    </Stack>
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                    <Button
                                        variant="contained"
                                        onClick={() => handleDownloadTemplate(template)}
                                    >
                                        Download
                                    </Button>
                                    <Button variant="contained">Upload</Button>
                                </Stack>
                            </Stack>
                        </MPaper>
                    </Grid>
                ))
            ) : (
                <Typography variant="body1">Nenhum template encontrado</Typography>
            )}
        </Grid>
    )
}