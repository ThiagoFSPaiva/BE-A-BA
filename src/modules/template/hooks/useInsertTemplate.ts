import { useEffect, useState } from "react";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { useRequests } from "../../../shared/hooks/useRequests";
import { useNavigate, useParams } from "react-router-dom";
import { InsertTemplateType } from "../types/InsertTemplateType";
import { GerenciarTemplateRoutesEnum, TemplateRoutesEnum } from "../routes";
import { useTemplateAdminReducer } from "../../../store/reducers/templateAdminReducer/useTemplateAdminReducer";
import { URL_TEMPLATE, URL_TEMPLATE_ID } from "../../../shared/constants/urls";

const DEFAULT_PRODUCT = {
    name: '',
    extensao: '',
    campo: [{ name: '', tipo: '' }]
};


export const useTemplateInsert = () => {
    const navigate = useNavigate();
    const { templateId } = useParams<{ templateId: string }>();
    const { request } = useRequests();
    const { template: templateReducer, setTemplate: setTemplateReducer } = useTemplateAdminReducer();
    const [isEdit, setIsEdit] = useState(false);
    const [disabledButton, setDisabledButton] = useState(true);


    const [template, setTemplate] = useState<InsertTemplateType>(DEFAULT_PRODUCT);


    useEffect(() => {
        if (template.name && template.extensao && template.campo) {
            setDisabledButton(false);
        } else {
            setDisabledButton(true);
        }
    }, [template]);


    useEffect(() => {
        if (templateReducer) {
            setTemplate({
                name: templateReducer.name,
                extensao: templateReducer.extensao,
                campo: templateReducer.campo,
                categoryId: templateReducer.category?.id
            });
        }
    }, [templateReducer]);


    useEffect(() => {
        const findProduct = async () => {
            await request(
                URL_TEMPLATE_ID.replace('{templateId}', templateId || ''),
                MethodsEnum.GET,
                setTemplateReducer,
            );
        };

        if (templateId) {
            setIsEdit(true);
            findProduct();
        } else {
            setTemplateReducer(undefined);
            setTemplate(DEFAULT_PRODUCT);
        }
    }, [templateId]);


    const handleOnChangeInput = (event: any, name: string, index?: number) => {

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
        if (templateId) {
            await request(
                URL_TEMPLATE_ID.replace('{templateId}', templateId),
                MethodsEnum.PUT,
                undefined,
                template,
            );
            navigate(GerenciarTemplateRoutesEnum.TEMPLATE_GERENCIAR);
        } else {
            await request(URL_TEMPLATE, MethodsEnum.POST, undefined, template);
            navigate(TemplateRoutesEnum.TEMPLATE);
        }
        
    };

    const handleCancel = async () => {
        if (templateId) {
            navigate(GerenciarTemplateRoutesEnum.TEMPLATE_GERENCIAR)
        } else {
            navigate(TemplateRoutesEnum.TEMPLATE);

        }
    }

    const handleAddCampo = () => {
        setTemplate((currentTemplate) => ({
            ...currentTemplate,
            campo: [...currentTemplate.campo, { name: '', tipo: '' }],
        }));
    };


    return {
        isEdit,
        template,
        disabledButton,
        handleInsertTemplate,
        handleAddCampo,
        handleOnChangeInput,
        handleCancel,
        handleChangeSelect
    };
}