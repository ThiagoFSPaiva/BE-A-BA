import { CircularProgress } from "@mui/material"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { TemplateRoutesEnum } from "../../template/routes"
import { userGlobalContext } from "../../../shared/hooks/useGlobalContext"


export const FirstScreen = () => {

    const { user } = userGlobalContext()
    const navigate = useNavigate();
  
    useEffect(() => {
      if (user) {
        navigate(TemplateRoutesEnum.TEMPLATE);
      }
      
    }, []);

    return (
      <CircularProgress/>  
    )


}

