import { NavigateFunction } from "react-router-dom";
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

export const verifyLoggedIn = async (setUser: (user: UserType) => void, user?: UserType) => {
    
    if(!user) {
      await connectionAPIGet<UserType>(URL_USER).then((userReturn) => {
        setUser(userReturn);
      })
      .catch(() => {
        location.href = '/login';
      })
    
    };
    return null

}
