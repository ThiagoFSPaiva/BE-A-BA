import { redirect } from "react-router-dom";
import { UserType } from "../../../modules/login/types/UserType";
import { AUTHORIZATION_KEY } from "../../constants/authorizationConstants";
import { getItemStorage, removeItemStorage, setItemStorage } from "./localStorageProxy";
import { URL_USER } from "../../constants/urls";
import { LoginRoutesEnum } from "../../../modules/login/routes";
import { connectionAPIGet } from "./connectionAPI";

export const unsetAuthorizationToken = () => removeItemStorage(AUTHORIZATION_KEY);

export const setAuthorizationToken = (token?: string) => {
    if(token) {
        setItemStorage(AUTHORIZATION_KEY, token);
    }
    
}

export const getAuthorizationToken = () => getItemStorage(AUTHORIZATION_KEY);

export const verifyLoggedIn = async () => {
    const token = getAuthorizationToken();
    
    if(!token) {
        return redirect(LoginRoutesEnum.LOGIN);
    }

    const user = await connectionAPIGet<UserType>(URL_USER).catch(() => {
      unsetAuthorizationToken();
    }); 
    
    if(!user) {
        return redirect(LoginRoutesEnum.LOGIN);
    };
    return null

}
