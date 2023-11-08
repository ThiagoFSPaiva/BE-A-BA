import { useState } from "react"
import ConnectionAPI, { MethodType, connectionAPIPost } from "../functions/connection/connectionAPI"
import { URL_AUTH } from "../constants/urls"
import { setAuthorizationToken } from "../functions/connection/auth"
import { AuthType } from "../../modules/login/types/AuthType"
import { NavigateFunction } from "react-router-dom"
import { FirstScreenRoutesEnum } from "../../modules/firstScreen/routes"
import { useGlobalReducer } from "../../store/reducers/globalReducer/useGlobalReducer"

export const useRequests = () => {
    const [loading,setLoading] = useState(false);
    const {setUser} = useGlobalReducer();

    const request = async <T>(
        url: string,
        method: MethodType,
        saveGlobal?: (object: T) => void,
        body?: unknown,
      ): Promise<T | undefined> => {
        setLoading(true);
    
        const returnObject: T | undefined = await ConnectionAPI.connect<T>(url, method, body)
          .then((result) => {
            if (saveGlobal) {
              saveGlobal(result);
            }

            return result;
          })
          .catch(() => {
            return undefined;
          });
    
        setLoading(false);
    
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

    const authRequest = async (navigate: NavigateFunction ,body: unknown): Promise<void> => {
        setLoading(true)

         await connectionAPIPost<AuthType>(URL_AUTH,body)
            .then((response) => {
                setUser(response.user)
                setAuthorizationToken(response.accessToken)
                navigate(FirstScreenRoutesEnum.FIRST_SCREEN)
                return response
            })
            .catch((erro) => {
                alert(erro.message)
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