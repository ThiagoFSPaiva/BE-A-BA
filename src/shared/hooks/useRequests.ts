import { useState } from "react"
import ConnectionAPI, { MethodType, connectionAPIPost } from "../functions/connection/connectionAPI"
import { URL_AUTH } from "../constants/urls"
import { setAuthorizationToken } from "../functions/connection/auth"
import { AuthType } from "../../modules/login/types/AuthType"
import { NavigateFunction } from "react-router-dom"
import { FirstScreenRoutesEnum } from "../../modules/firstScreen/routes"
import { useGlobalReducer } from "../../store/reducers/globalReducer/useGlobalReducer"
import Swal from "sweetalert2"
import { useTheme } from "@mui/material"


export const useRequests = () => {
  const [loading, setLoading] = useState(false);
  const { setNotification, setUser } = useGlobalReducer();
  const theme = useTheme();

  const request = async <T>(
    url: string,
    method: MethodType,
    saveGlobal?: (object: T) => void,
    body?: unknown,
    message?: string
  ): Promise<T | undefined> => {
    setLoading(true);

    const returnObject: T | undefined = await ConnectionAPI.connect<T>(url, method, body)
      .then((result) => {
        if (saveGlobal) {
          saveGlobal(result);
        }
        if (message) {
          setNotification(message, 'success');
        }
        return result;
      })
      .catch((error: Error) => {
        setNotification(error.message, 'error');
        return undefined;
      });

    setLoading(false);

    return returnObject;
  };

  const postRequest = async<T>(url: string, body: unknown): Promise<T | undefined> => {
    setLoading(true)

    const returnData = await connectionAPIPost<T>(url, body)
      .then((response) => {
        return response
      })
      .catch((error: Error) => {
        alert(error.message)
        return undefined
      })

    setLoading(false)
    return returnData
  }

  const authRequest = async (navigate: NavigateFunction, body: unknown): Promise<void> => {
    setLoading(true)

    await connectionAPIPost<AuthType>(URL_AUTH, body)
      .then((response) => {
        setUser(response.user)
        setAuthorizationToken(response.accessToken)
        navigate(FirstScreenRoutesEnum.FIRST_SCREEN)
        return response
      })
      .catch((error) => {

        Swal.fire({
          background:theme.palette.background.paper,
          color: theme.palette.text.primary,
          icon: "error",
          title: `Acesso negado...`,
          html: `<span style="color: ${theme.palette.text.secondary};">${error.message}</span>`,
          confirmButtonColor: "#f44336",
          customClass: {
            popup: 'swal-popup',
          },
        });
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