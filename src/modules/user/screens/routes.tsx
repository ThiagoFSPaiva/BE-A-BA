import { RouteObject } from "react-router-dom";
import MainLayout from "../../../layout/MainLayout";
import { UsuariosPage } from "./UsuariosPage";

export enum UsuarioRoutesEnum {
    Usuario = '/usuarios',
}

export const usuarioScreen: RouteObject[] = [
    {
        element: <MainLayout />,
        children: [
            {
                path: UsuarioRoutesEnum.Usuario,
                element: <UsuariosPage />,
            }
        ]
    }

]