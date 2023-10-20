import { useState } from "react"
import ConnectionAPI, { MethodType, connectionAPIGet, connectionAPIPost } from "../functions/connection/connectionAPI"
import { URL_AUTH } from "../constants/urls"
import { ERROR_INVALID_PASSOWORD } from "../constants/errosStatus"
import { useNavigate } from "react-router-dom"
import { TemplateRoutesEnum } from "../../modules/template/routes"
import { setAuthorizationToken } from "../functions/connection/auth"
import { AuthType } from "../../modules/login/types/AuthType"
import { userGlobalContext } from "./useGlobalContext"

export const useRequests = () => {
    const [loading,setLoading] = useState(false);
    const {setUser} = userGlobalContext();
    const navigate = useNavigate()


    const request = async <T>(
        url: string, 
        method: MethodType, 
        saveGlobal?: (object: T) => void,
        body?: unknown,
        ):Promise<T | undefined >  => {
        setLoading(true)

        const returnObject: T | undefined = await ConnectionAPI.connect<T>(url,method,body)
            .then((response) => {
                if(saveGlobal) {
                    saveGlobal(response)
                }
                return response;
            })
            .catch((erro)=> {
                console.log(erro.message)
                return undefined
            })

           return returnObject;

    };

    const postRequest = async<T> (url: string,body: unknown): Promise<T | undefined> => {
        setLoading(true)

        const returnData = await connectionAPIPost<T>(url,body)
            .then((response) => {
                return response
            })
            .catch((erro:Error) => {
                console.log(erro)
                alert(erro.message)
                return undefined
            })
        
        setLoading(false)
        return returnData
    }

    const authRequest = async (body: unknown): Promise<void> => {
        setLoading(true)

         await connectionAPIPost<AuthType>(URL_AUTH,body)
            .then((response) => {
                setUser(response.user)
                setAuthorizationToken(response.accessToken)
                navigate(TemplateRoutesEnum.TEMPLATE)
                return response
            })
            .catch(() => {
                alert(ERROR_INVALID_PASSOWORD)
                return undefined
            })
        
        setLoading(false)
        
    }




    return {
        loading,
        authRequest,
        request,
        postRequest
    }

}