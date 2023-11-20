import { RouteObject } from "react-router-dom";
import MainLayout from "../../../layout/MainLayout";
import { UsuariosPage } from "./UsuariosPage";
import { InsertUsuarioPage } from "./InsertUsuarioPage";

export enum UsuarioRoutesEnum {
    Usuario = '/user',
    USUARIO_INSERT = '/user/insert',
    USUARIO_EDIT = '/user/:userId'
}

export enum UserSettingsEnum {
    SETTINGS = '/settings'
}

export const usuarioScreen: RouteObject[] = [
    {
        element: <MainLayout />,
        children: [
            {
                path: UsuarioRoutesEnum.Usuario,
                element: <UsuariosPage />,
            },
            {
                path: UsuarioRoutesEnum.USUARIO_INSERT,
                element: <InsertUsuarioPage />,
            },
            {
                path: UsuarioRoutesEnum.USUARIO_EDIT,
                element: <InsertUsuarioPage />,
            }
        ]
    }

]


export const settingsScreen: RouteObject[] = [
    {
        element: <MainLayout />,
        children: [
            {
                path: UserSettingsEnum.SETTINGS,
                element: <UsuariosPage />,
            },
        ]
    }

]