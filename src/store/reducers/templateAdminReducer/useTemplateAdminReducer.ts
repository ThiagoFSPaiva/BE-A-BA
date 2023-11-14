import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import { TemplateType } from "../../../modules/template/types/TemplateType";
import { setAtivosAction, setInativosAction, setPendentesAction } from ".";



export const useTemplateAdminReducer = () => {
    const dispatch = useDispatch();
    const { templatesAtivos,templatesInativos,templatesPendentes } = useAppSelector(state => state.templateAdminReducer);

    const setTemplatesAtivos = (template: TemplateType[]) => {
        dispatch(setAtivosAction(template))
    }
    const setTemplatesPendentes = (template: TemplateType[]) => {
        dispatch(setPendentesAction(template))
    }
    const setTemplatesInativos = (template: TemplateType[]) => {
        dispatch(setInativosAction(template))
    }
    
    return {
        setTemplatesAtivos,
        setTemplatesPendentes,
        setTemplatesInativos,
        templatesAtivos,
        templatesInativos,
        templatesPendentes
    }
}