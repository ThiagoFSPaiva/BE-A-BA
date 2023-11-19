import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import { TemplateType } from "../../../modules/template/types/TemplateType";
import { setTemplatesAction } from ".";



export const useTemplateAdminReducer = () => {
    const dispatch = useDispatch();
    const { templates, template } = useAppSelector(state => state.templateAdminReducer);

    const setTemplate = (template: TemplateType[]) => {
        dispatch(setTemplatesAction(template))
    }
    const setTemplates = (template: TemplateType[]) => {
        dispatch(setTemplatesAction(template))
    }
    
    return {
        setTemplate,
        template,
        setTemplates,
        templates,
    }
}