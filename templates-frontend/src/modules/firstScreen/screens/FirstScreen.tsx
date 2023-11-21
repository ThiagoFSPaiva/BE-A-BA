import { CircularProgress } from "@mui/material"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { TemplateRoutesEnum } from "../../template/routes"
import { useGlobalReducer } from "../../../store/reducers/globalReducer/useGlobalReducer"


export const FirstScreen = () => {

    const { user } = useGlobalReducer()
    const navigate = useNavigate();
  
    useEffect(() => {
      if (user) {
        navigate(TemplateRoutesEnum.TEMPLATE);
      }
      
    }, [user]);

    return (
      <CircularProgress/>  
    )


}

