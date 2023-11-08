import { RouteObject } from "react-router-dom";
import AppLayout from "../../layout/AppLayout";
import LoginPage from "./screens/LoginPage";
import { PageNotFound } from "../firstScreen/screens/PageNotFound";

export enum LoginRoutesEnum {
    LOGIN = '/login',
    NOT_FOUND = '/not-found'
}

export const loginRoutes: RouteObject[] = [
    {
        element: <AppLayout />,
        errorElement: <PageNotFound />,
        children: [
            {
                path: LoginRoutesEnum.LOGIN,
                element: <LoginPage />,
            },
            {
                path: '/not-found',
                element: <PageNotFound/>
            }
        ]
    }

]

