import { Box, Button, Card, CardActions, CardContent, Grid, Stack, Typography } from "@mui/material";
import { TemplateType } from "../types/TemplateType";
import MPaper from "../../../components/common/MPaper";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { images } from "../../../assets";

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
            <Card component={MPaper}>
                <Box
                    sx={{
                        margin: "auto",
                        backgroundColor: "#e6e8ed",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                    }}
                >
                    <img src={images.iconsTemplate[template.extensao]} alt="Template Icon" />
                </Box>
                <CardContent sx={{ gap: "10px" }}>
                    <Typography noWrap variant="body1" color={theme => theme.palette.text.primary} align="center" mb={2}>
                        {template.name}
                    </Typography>
                    <Typography
                        variant="subtitle2"
                        align="center"
                        mb={2}
                        sx={{
                            color: "#fff",
                            bgcolor: "#238527",
                            borderRadius: 1,
                            width: "80px",
                            margin: "16px auto",
                            display: "block",
                        }}
                    >
                        {template.status}
                    </Typography>
                    <Stack spacing={1} alignItems="center">

                        <Typography variant="body2" align="center" color={theme => theme.palette.text.secondary}>
                            Categoria:{' '}
                        </Typography>
                        <Typography variant="body1" color={theme => theme.palette.primary.contrastText} >
                            {template.category.name}
                        </Typography>
                        <Stack spacing={1} direction="row" alignItems="center">
                            <Typography variant="body1" color={theme => theme.palette.text.secondary}>
                                Criado em:{' '}
                            </Typography>
                            <Typography variant="body2" color="primary" component="span">
                                {template.createdAt}
                            </Typography>

                        </Stack>
                    </Stack>




                    <Stack direction="row" justifyContent="center" mt={2} spacing={2}>
                        <Stack alignItems="center" direction="column">
                            <Typography variant="body1" color={theme => theme.palette.text.primary}>{template.extensao}</Typography>
                            <Typography variant="body1" color={theme => theme.palette.text.secondary}>Extensão</Typography>
                        </Stack>
                        <Stack alignItems="center" direction="column">
                            <Typography variant="body1" color={theme => theme.palette.text.primary}>{template.campo.length}</Typography>
                            <Typography variant="body1" color={theme => theme.palette.text.secondary}>Campos</Typography>
                        </Stack>

                    </Stack>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', gap: "10px" }}>
                    <Button
                        color="primary"
                        variant="contained"
                        startIcon={<CloudDownloadIcon />}
                        onClick={() => handleDownloadTemplate(template.id)}
                    >
                        Download
                    </Button>
                    <Button
                        color="secondary"
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon />}
                        onClick={handleOpen}
                    >
                        Upload
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};


