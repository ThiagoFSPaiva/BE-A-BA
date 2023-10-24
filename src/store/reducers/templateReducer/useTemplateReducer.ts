import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import { TemplateType } from "../../../modules/template/types/TemplateType";
import { setMeusTemplatesAction, setTemplatesAtivosAction } from ".";



export const useTemplateReducer = () => {
    const dispatch = useDispatch();
    const { templateAtivos,meusTemplates } = useAppSelector(state => state.templateReducer);

    const setTemplateAtivo = (template: TemplateType[]) => {
        dispatch(setTemplatesAtivosAction(template))
    }
    const setMeusTemplates = (template: TemplateType[]) => {
        dispatch(setMeusTemplatesAction(template))
    }
    
    return {
        templateAtivos,
        setTemplateAtivo,
        meusTemplates,
        setMeusTemplates
    }
}