import { TemplateType } from "../../types/TemplateType";
import { Box, Button, Grid, InputAdornment, MenuItem, Modal, Pagination, Select, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useCallback, useState } from "react";
import React from "react";
import { useDropzone } from 'react-dropzone';
import { getAuthorizationToken } from "../../../../shared/functions/connection/auth";
import { TemplateCard } from "../../components/TemplateCard";
import SearchIcon from '@mui/icons-material/Search';
import { useTemplate } from "../../hooks/states/useTemplate";


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: (theme: any) => theme.palette.background.paper,
    boxShadow: 24,
    p: 4,
};


export const TemplatesAtivos = () => {
    const {

        totalPages,
        currentTemplates,
        formatFilter,
        page,
        searchText,
        handleFormatFilterChange,
        handleChangePage,
        handleSearch,
        handleDownloadTemplate
    } = useTemplate();

    const [selectedTemplate, setSelectedTemplate] = useState<TemplateType | null>(null);


    const allowedFileTypes = ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'text/csv'];
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length) {
            const file = acceptedFiles[0];
            if (allowedFileTypes.includes(file.type)) {
                setSelectedFile(file);
            } else {
                console.error("File type not allowed");
            }
        }
    }, []);


    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'application/vnd.ms-excel': ['.xls', '.xlsx'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'text/csv': ['.csv']
        }
    });

    const handleOnSubmit = (templateId: number, extensao: string) => {
        const token = getAuthorizationToken();

        if (selectedFile) {
            const formData = {
                extensao,
                templateId: templateId,
                file: selectedFile,
            };

            const config = {
                headers: {
                    Authorization: token,
                    'Content-Type': 'multipart/form-data',
                },
            };

            axios.post(`http://127.0.0.1:5000/upload`, formData, config)
                .then((response) => {
                    console.log('File uploaded successfully', response.data);
                })
                .catch((error) => {
                    console.error('Error uploading file', error);
                });
        }
    };


    return (
        <>
            <TextField
                sx={{ mb: 5 }}
                value={searchText}
                onChange={handleSearch}
                placeholder="Pesquisar"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}

            />
            <Select
                value={formatFilter}
                onChange={handleFormatFilterChange}
                style={{ marginLeft: 10 }}
            >
                <MenuItem value="all">Todos</MenuItem>
                <MenuItem value="csv">CSV</MenuItem>
                <MenuItem value="xls">XLS</MenuItem>
                <MenuItem value="xlsx">XLSX</MenuItem>
            </Select>

            {currentTemplates.length > 0 ? (
                <Grid container spacing={2}>
                    {currentTemplates.length > 0 ? (
                        currentTemplates.map((template, index) => (
                            <TemplateCard
                                key={index}
                                template={template}
                                handleDownloadTemplate={handleDownloadTemplate}
                                handleOpen={() => {
                                    setSelectedTemplate(template);
                                    handleOpen();
                                }}
                            />
                        ))
                    ) : (
                        <Typography marginBottom={2} variant="body1">Nenhum template encontrado</Typography>
                    )}
                </Grid>
            ) : (
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Typography variant="body1">
                        Nenhum template encontrado
                    </Typography>
                </Grid>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                <Pagination color="secondary" siblingCount={0} count={totalPages} page={page} onChange={handleChangePage} />
            </Box>

            <Modal
                open={open}
                onClose={() => {
                    handleClose();
                    setSelectedFile(null);
                    setSelectedTemplate(null);
                }}
            >
                <Box sx={style}>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} name="file" />
                        <p>Arraste e solte um arquivo aqui ou clique para selecionar um arquivo</p>
                    </div>
                    {selectedFile && <p>Arquivo selecionado: {selectedFile.name}</p>}
                    <Button
                        variant="contained"
                        onClick={() => selectedTemplate && handleOnSubmit(selectedTemplate.id, selectedTemplate.extensao)}
                        disabled={!selectedFile || !selectedTemplate?.id}
                    >
                        Enviar
                    </Button>
                </Box>
            </Modal>

        </>



    )
}
