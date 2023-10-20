import { RouteObject } from "react-router-dom";
import AppLayout from "../../layout/AppLayout";
import LoginPage from "./screens/LoginPage";

export enum LoginRoutesEnum {
    LOGIN = '/login'
}

export const loginRoutes: RouteObject[] = [
    {
        element: <AppLayout />,
        children: [
            {
                path: LoginRoutesEnum.LOGIN,
                element: <LoginPage />,
            },
        ]
    }

]

