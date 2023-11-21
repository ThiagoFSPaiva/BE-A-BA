import { TemplateType } from "../../types/TemplateType";
import { Box, Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import MPaper from "../../../../components/common/MPaper";
import { useRequests } from "../../../../shared/hooks/useRequests";
import { useEffect } from "react";
import { URL_MYTEMPLATES_PENDENTES } from "../../../../shared/constants/urls";
import { useTemplateReducer } from "../../../../store/reducers/templateReducer/useTemplateReducer";
import { MethodsEnum } from "../../../../shared/enums/methods.enum";
import { images } from "../../../../assets";



export const TemplatePendente = () => {
  const { meusTemplatesPendentes, setMeusTemplatesPendentes } = useTemplateReducer();
  const { request } = useRequests();


  useEffect(() => {
    request<TemplateType[]>(URL_MYTEMPLATES_PENDENTES, MethodsEnum.GET, setMeusTemplatesPendentes);
  }, []);


  return (





    <Grid container spacing={3}>
      {meusTemplatesPendentes.length === 0 ? (
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Typography variant="body1">
            Nenhum template encontrado
          </Typography>
        </Grid>
      ) : (
        meusTemplatesPendentes.map((template, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card component={MPaper}>
              <Box sx={{
                margin: "auto",
                backgroundColor: "#e6e8ed",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "60px",
                height: "60px",
                borderRadius: "50%",
              }}>
                <img src={images.iconsTemplate[template.extensao]} alt={template.name} />
              </Box>
              <CardContent sx={{ gap: "10px" }}>
                <Typography noWrap variant="body1" align="center" mb={2}>
                  {template.name}
                </Typography>
                <Typography variant="subtitle2" align="center" mb={2} sx={{
                  bgcolor: "#b37509",
                  borderRadius: 1,
                  width: "80px",
                  margin: "16px auto"
                }}>
                  {template.status}
                </Typography>
                <Typography variant="body1" align="center" color={'#929292'}>
                  Criado em: <Typography variant="body2" color="primary">{template.createdAt}</Typography>
                </Typography>
                <Stack direction="row" justifyContent="center" mt={2} spacing={2}>
                  <Stack alignItems="center" direction="column">
                    <Typography variant="body1">{template.extensao}</Typography>
                    <Typography variant="body1" color={'#929292'}>Extensão</Typography>
                  </Stack>
                  <Stack alignItems="center" direction="column">
                    <Typography variant="body1">{template.campo.length}</Typography>
                    <Typography variant="body1" color={'#929292'}>Campos</Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  )
}