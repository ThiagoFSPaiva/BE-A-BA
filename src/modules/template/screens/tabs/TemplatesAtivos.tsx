import { TemplateType } from "../../types/TemplateType";
import { Box, Button, Grid, Modal,Typography} from "@mui/material";
import axios from "axios";
import { URL_TEMPLATE_DOWNLOAD } from "../../../../shared/constants/urls";
import { useCallback, useState } from "react";
import React from "react";
import { useDropzone } from 'react-dropzone';
import { getAuthorizationToken } from "../../../../shared/functions/connection/auth";
import { TemplateCard } from "../../components/TemplateCard";

interface TemplateAtivosProps {
    currentTemplates: TemplateType[];
    onFileUpload: (file: File) => void;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#757575',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const TemplatesAtivos: React.FC<TemplateAtivosProps> = ({ currentTemplates, onFileUpload }) => {
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
                onFileUpload(file);
            } else {
                console.error("File type not allowed");
            }
        }
    }, [onFileUpload]);


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

      const handleDownloadTemplate = (templateId: number) => {
        const formData = { templateId: templateId };
        axios.post(URL_TEMPLATE_DOWNLOAD, formData, { responseType: 'blob' })

            .then((response) => {

                const contentDisposition = response.headers['content-disposition'];
                const match = contentDisposition && contentDisposition.match(/filename="(.+)"$/);
            
                // Se houver correspondência, obtenha o nome do arquivo
                const fileName = match ? match[1] : 'download';

                console.log(response.data.templateName)
                const mimeType = response.headers['content-type'];
                const url = window.URL.createObjectURL(new Blob([response.data],{ type: mimeType }));
                const link = document.createElement('a');
                link.href = url;
                link.download = fileName;
                link.click();
                link.remove();
            })
            .catch((error) => {
                console.error('Error downloading template:', error);
            });
    };

    return (
        <>
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
                        onClick={() => selectedTemplate && handleOnSubmit(selectedTemplate.id,selectedTemplate.extensao)}
                        disabled={!selectedFile || !selectedTemplate?.id}
                    >
                        Enviar
                    </Button>
                </Box>
            </Modal>

        </>



    )
}
