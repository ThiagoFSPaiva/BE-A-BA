import { useEffect, useState } from "react";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { useRequests } from "../../../shared/hooks/useRequests";
import { useNavigate } from "react-router-dom";
import { InsertTemplateType } from "../types/InsertTemplateType";
import { TemplateRoutesEnum } from "../routes";

const DEFAULT_PRODUCT = {
    name: '',
    extensao: '',
    campo: [{ name: '', tipo: '' }]
};


export const useTemplateInsert = () => {
    const navigate = useNavigate();
    const { request } = useRequests();
    const [disabledButton, setDisabledButton] = useState(true);


    const [template, setTemplate] = useState<InsertTemplateType>(DEFAULT_PRODUCT);


    useEffect(() => {
        if (template.name && template.extensao && template.campo) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true);
        }
    }, [template]);





    const handleOnChangeInput = (event:any, name:string, index?:number) => {
        
        if (name === 'name' || name === 'extensao') {
            setTemplate((currentTemplate) => ({
                ...currentTemplate,
                [name]: event.target.value,
            }));
        } else if (name === 'campo') {
            const updatedCampo = template.campo.map((campo, i) => {
                if (i === index) {
                    return { ...campo, name: event.target.value };
                }
                return campo;
            });
            setTemplate((currentTemplate) => ({
                ...currentTemplate,
                campo: updatedCampo,
            }));
        } else if (name === 'tipo') {
            const updatedCampo = template.campo.map((campo, i) => {
                if (i === index) {
                    return { ...campo, tipo: event.target.value };
                }
                return campo;
            });
            setTemplate((currentTemplate) => ({
                ...currentTemplate,
                campo: updatedCampo,
            }));
        }
    };


    const handleChangeSelect = (event: any) => {
        const categoryId = event.target.value as number;
      
        setTemplate((prevTemplate) => ({
          ...prevTemplate,
          categoryId,
        }));
      
        console.log(template);
      };

    const handleInsertTemplate = async () => {

            request('http://localhost:3000/template/criar-template', MethodsEnum.POST, undefined, template)
            .then((response) => {
                if (response) {
                  navigate(TemplateRoutesEnum.TEMPLATE);
                }
            }).catch((erro) => erro)
          
    }

    const handleCancel = async () => {
        navigate(TemplateRoutesEnum.TEMPLATE);
    }

    const handleAddCampo = () => {
        setTemplate((currentTemplate) => ({
            ...currentTemplate,
            campo: [...currentTemplate.campo, { name: '', tipo: '' }],
        }));
    };


    return {
        template,
        disabledButton,
        handleInsertTemplate,
        handleAddCampo,
        handleOnChangeInput,
        handleCancel,
        handleChangeSelect
    };
}