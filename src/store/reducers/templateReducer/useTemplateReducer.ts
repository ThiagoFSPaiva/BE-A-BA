import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import { TemplateType } from "../../../modules/template/types/TemplateType";
import { setMeusTemplatesInativosAction, setMeusTemplatesPendentesAction, setTemplatesAtivosAction } from ".";



export const useTemplateReducer = () => {
    const dispatch = useDispatch();
    const { templateAtivos,meusTemplatesInativos,meusTemplatesPendentes } = useAppSelector(state => state.templateReducer);

    const setTemplateAtivo = (template: TemplateType[]) => {
        dispatch(setTemplatesAtivosAction(template))
    }
    const setMeusTemplatesInativos = (template: TemplateType[]) => {
        dispatch(setMeusTemplatesInativosAction(template))
    }
    const setMeusTemplatesPendentes = (template: TemplateType[]) => {
        dispatch(setMeusTemplatesPendentesAction(template))
    }
    
    return {
        templateAtivos,
        setTemplateAtivo,
        meusTemplatesPendentes,
        setMeusTemplatesPendentes,
        meusTemplatesInativos,
        setMeusTemplatesInativos
    }
}