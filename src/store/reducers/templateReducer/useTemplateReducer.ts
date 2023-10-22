import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import { TemplateType } from "../../../modules/template/types/TemplateType";
import { setTemplateAction } from ".";


export const useTemplateReducer = () => {
    const dispatch = useDispatch();
    const { template } = useAppSelector(state => state.templateReducer);

    const setTemplate = (template: TemplateType[]) => {
        dispatch(setTemplateAction(template))
    }
    
    return {
        template,
        setTemplate
    }
}