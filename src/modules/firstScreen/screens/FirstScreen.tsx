import { CircularProgress } from "@mui/material"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { TemplateRoutesEnum } from "../../template/routes"


export const FirstScreen = () => {

    const { user } = useGlobalReducer();
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

function useGlobalReducer(): { user: any } {
    throw new Error("Function not implemented.")
}
