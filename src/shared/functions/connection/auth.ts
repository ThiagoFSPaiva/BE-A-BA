import { NavigateFunction, redirect } from "react-router-dom";
import { UserType } from "../../../modules/login/types/UserType";
import { AUTHORIZATION_KEY } from "../../constants/authorizationConstants";
import { getItemStorage, removeItemStorage, setItemStorage } from "./localStorageProxy";
import { URL_USER } from "../../constants/urls";
import { LoginRoutesEnum } from "../../../modules/login/routes";
import { connectionAPIGet } from "./connectionAPI";
import { UserTokenType } from "../../../modules/login/types/UserTokenType";
import { UserTypeEnum } from "../../enums/userType.enum";

export const unsetAuthorizationToken = () => removeItemStorage(AUTHORIZATION_KEY);

export const setAuthorizationToken = (token?: string) => {
    if(token) {
        setItemStorage(AUTHORIZATION_KEY, token);
    }
}

export const getUserInfoByToken = (): UserTokenType | undefined => {
  const token = getAuthorizationToken();
  const tokenSplited = token?.split('.');

  if (tokenSplited && tokenSplited.length > 1) {
    return JSON.parse(window.atob(tokenSplited[1]));
  }

  return undefined;
};


export const verifyAdmin = async () => {

  const token = getAuthorizationToken();
  if (!token) {
    return redirect(LoginRoutesEnum.LOGIN);
  }

  const user = await connectionAPIGet<UserType>(URL_USER).catch(() => {
    unsetAuthorizationToken();
  });

  if (!user || user.typeUser !== UserTypeEnum.Admin) {
    return redirect(LoginRoutesEnum.NOT_FOUND);
  }

  return null
}


export const getAuthorizationToken = () => getItemStorage(AUTHORIZATION_KEY);

export const verifyLoggedIn = async () => {
    
    const token = getAuthorizationToken();
    if (!token) {
      return redirect(LoginRoutesEnum.LOGIN);
    }
    const user = await connectionAPIGet<UserType>(URL_USER).catch(() => {
      unsetAuthorizationToken();
    });
  
    if (!user) {
      return redirect(LoginRoutesEnum.LOGIN);
    }

    return null

}


export const logout = (navigate: NavigateFunction) => {
    unsetAuthorizationToken();
    navigate(LoginRoutesEnum.LOGIN);
}