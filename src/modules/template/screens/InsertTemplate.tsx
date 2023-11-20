import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  useTheme,
} from '@mui/material';
import { useTemplateInsert } from '../hooks/useInsertTemplate';
import MPaper from '../../../components/common/MPaper';
import { useCategory } from '../../category/hooks/useCategory';
import { CategoryType } from '../../category/types/CategoryType';
import { Header } from '../../../components/common/Header';
import BackupTableOutlinedIcon from '@mui/icons-material/BackupTableOutlined';

export const InsertTemplate = () => {
  const theme = useTheme();

  const tipos = [
    { value: 'object', label: 'texto' },
    { value: 'float64', label: 'decimal' },
    { value: 'datetime64[ns]', label: 'data' },
    { value: 'bool', label: 'booleano' },
    { value: 'int64', label: 'inteiro' }

  ];
  const {
    isEdit,
    template,
    disabledButton,
    handleAddCampo,
    handleInsertTemplate,
    handleOnChangeInput,
    handleCancel,
    handleChangeSelect,
    handleRemoveCampo
  } = useTemplateInsert();
  const { categories } = useCategory();

  return (


    <>
      <Header
        title={isEdit ? 'Editar template' : 'Cadastrar Template'}
        description={isEdit ? 'Edite todo o conteundo do template' : '"Visualize e gerencie todos templates, podendo ativar,desativar,editar,excluir.'}
        icon={<BackupTableOutlinedIcon sx={{ color: theme.palette.primary.contrastText, fontSize: 60 }} />}>
      </Header>


      <MPaper>
        <Box
          component="form"
          noValidate
          autoComplete="off"
        >



          <Grid container gap={3} alignItems="center">

            {/* Linha 1: Nome do Template */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <TextField
                  value={template.name}
                  onChange={(event) => handleOnChangeInput(event, 'name')}
                  label="Nome"
                  variant="filled"
                />
              </FormControl>
            </Grid>

            {/* Linha 2: Categoria e Extensão */}
            <Grid item xs={6}>
              <FormControl fullWidth variant="filled">
                <InputLabel>Categoria</InputLabel>
                <Select
                  value={template.categoryId || ''}
                  onChange={(event) => handleChangeSelect(event)}
                >
                  {categories.map((category: CategoryType) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={6}>
              <FormControl fullWidth variant="filled">
                <InputLabel>Extensao</InputLabel>
                <Select
                  value={template.extensao}
                  onChange={(event) => handleOnChangeInput(event, 'extensao')}
                  id="demo-simple-select-filled"
                >
                  <MenuItem value="xls">xls</MenuItem>
                  <MenuItem value="xlsx">xlsx</MenuItem>
                  <MenuItem value="csv">csv</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Linha 3: Nome do Campo, Tipo e Botão + */}
            {template.campo.map((campo, index) => (
              <Grid container gap={2} key={index} alignItems="center">
                <Grid item xs={5}>
                  <FormControl fullWidth>
                    <TextField
                      value={campo.name}
                      onChange={(event) => handleOnChangeInput(event, 'campo', index)}
                      label="Nome do Campo"
                      variant="filled"
                      required
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={4}>
                  <FormControl variant="filled" fullWidth>
                    <InputLabel>Tipo</InputLabel>
                    <Select
                      value={campo.tipo}
                      onChange={(event) => handleOnChangeInput(event, 'tipo', index)}
                    >
                      {tipos.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={2}>
                  <Button
                    onClick={handleAddCampo}
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '16px' }}
                  >
                    +
                  </Button>

                  <Button
                    onClick={() => handleRemoveCampo(index)}
                    variant="contained"
                    color="error"
                    style={{ marginTop: '16px', marginLeft: '8px' }}
                  >
                    -
                  </Button>
                </Grid>
              </Grid>
            ))}

          </Grid>

        </Box>
        <Box sx={{
          display: "flex",
          justifyContent: "flex-end",
          paddingTop: 3,
          gap: 2
        }}>

          <Button variant="contained" onClick={handleCancel} color="secondary">
            Cancelar
          </Button>

          <Button disabled={disabledButton} onClick={handleInsertTemplate} variant="contained" color="primary">
            {isEdit ? 'Salvar' : 'Inserir produto'}
          </Button>



        </Box>
      </MPaper>
    </>

  );
};

export default InsertTemplate;