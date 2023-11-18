import { Box, Button, FormControl, TextField } from "@mui/material"
import MPaper from "../../../components/common/MPaper"
import { useInsertCategory } from "../hooks/useInsertCategory"
import { Header } from "../../../components/common/Header";
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import { useNavigate } from "react-router-dom";
import { CategoryRoutesEnum } from "../routes";

export const CategoryInsert = () => {
    const navigate = useNavigate();
    const {

        name, categoryId, loading, handleOnChangeName, disabledButton, insertCategory 

    } = useInsertCategory();


    const handleOnClickCancel = () => {
        navigate(CategoryRoutesEnum.CATEGORY);
      };

    return (
        <>
            <Header
                title="Cadastrar categoria"
                description="Visualize e gerencie todos templates, podendo ativar ou desativar cada um."
                icon={<LayersOutlinedIcon sx={{ color: (theme: any) => theme.palette.primary.contrastText, fontSize: 60 }} />}>
            </Header>


            <MPaper>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                >

                    <FormControl fullWidth>
                        <TextField
                            value={name}
                            onChange={handleOnChangeName}
                            label="Nome"
                            variant="filled"
                        />
                    </FormControl>

                </Box>
                <Box sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    paddingTop: 3,
                    gap: 2
                }}>

                    <Button onClick={handleOnClickCancel} variant="contained" color="secondary">
                        Cancelar
                    </Button>

                    <Button onClick={insertCategory} disabled={disabledButton} variant="contained" color="primary">
                        {categoryId ? 'Salvar' : 'Inserir categoria'}
                    </Button>

                </Box>
            </MPaper>

        </>
    )
}