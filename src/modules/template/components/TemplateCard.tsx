import { Button, Grid, Stack, Typography } from "@mui/material";
import { TemplateType } from "../types/TemplateType";
import MPaper from "../../../components/common/MPaper";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

type TemplateCardProps = {
    template: TemplateType;
    handleDownloadTemplate: (template: number) => void;
    handleOpen: () => void;
};

export const TemplateCard: React.FC<TemplateCardProps> = ({
    template,
    handleDownloadTemplate,
    handleOpen,
}) => {
    return (
        <Grid item xs={12} sm={6} md={4}>
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
                            onClick={() => handleDownloadTemplate(template.id)}
                        >
                            Download
                        </Button>
                        <Button
                            component="label"
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                            onClick={handleOpen}
                        >
                            Upload
                        </Button>
                    </Stack>
                </Stack>
            </MPaper>
        </Grid>
    );
};
