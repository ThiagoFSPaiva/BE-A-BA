import { useNavigate } from "react-router-dom";
import { TemplateRoutesEnum } from "../routes";

export const useTemplate = () => {
    const navigate = useNavigate();


    const handleOnClickInsert = () => {
        navigate(TemplateRoutesEnum.TEMPLATE_INSERT);
      };
    


    return {
        handleOnClickInsert
    };
}


