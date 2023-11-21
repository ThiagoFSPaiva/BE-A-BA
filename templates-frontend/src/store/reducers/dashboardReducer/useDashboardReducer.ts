import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hooks";
import { setDadosTemplateAction } from ".";



export const useDashboardReducer = () => {
    const dispatch = useDispatch();
    const { dadosTemplate } = useAppSelector(state => state.dashboardReducer);

    const setDadosTemplate = (dadosTemplate: any[]) => {
        dispatch(setDadosTemplateAction(dadosTemplate))
    }

    return {
        dadosTemplate,
        setDadosTemplate
    }
}