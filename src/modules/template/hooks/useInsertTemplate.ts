import { useEffect, useState } from "react";
import { URL_USER } from "../../../shared/constants/urls";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { useRequests } from "../../../shared/hooks/useRequests";
import { useNavigate } from "react-router-dom";
import { InsertTemplateType } from "../types/InsertTemplateType";
import { TemplateRoutesEnum } from "../routes";

export const useTemplateInsert = () => {
    const navigate = useNavigate();
    const { request } = useRequests();
    const [disabledButton, setDisabledButton] = useState(true);
    const [template, setTemplate] = useState<InsertTemplateType>({
        name: '',
        extensao: '',
        campo: [{ name: '', tipo: '' }]
    });


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


    const handleInsertTemplate = async () => {

        console.log(template)

            request('http://localhost:3000/template/criar-template', MethodsEnum.POST, undefined, template)
            .then((response) => {
                if (response) {
                  navigate(TemplateRoutesEnum.TEMPLATE);
                }
            }).catch((erro) => erro)
          
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
    };
}