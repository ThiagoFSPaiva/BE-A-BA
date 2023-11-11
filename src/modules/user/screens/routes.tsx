import { RouteObject } from "react-router-dom";
import MainLayout from "../../../layout/MainLayout";
import { UsuariosPage } from "./UsuariosPage";
import { InsertUsuarioPage } from "./InsertUsuarioPage";

export enum UsuarioRoutesEnum {
    Usuario = '/usuarios',
    USUARIO_INSERT = '/usuarios/insert'
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
            }
        ]
    }

]