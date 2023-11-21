import { RouteObject } from "react-router-dom";
import AppLayout from "../../layout/AppLayout";
import LoginPage from "./screens/LoginPage";
import { PageNotFound } from "../firstScreen/screens/PageNotFound";
import { RecoveryPassword } from "./screens/RecoveryPassword";
import { ResetPassword } from "./screens/ResetPassword";

export enum LoginRoutesEnum {
    LOGIN = '/login',
    NOT_FOUND = '/not-found',
    RECOVERY_PASSWORD = '/recovery',
    RESET_PASSWORD = '/reset-password/:token'
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
            },
            {
                path: LoginRoutesEnum.RECOVERY_PASSWORD,
                element: <RecoveryPassword />,
            },
            {
                path: LoginRoutesEnum.RESET_PASSWORD,
                element: <ResetPassword />,
            },
        ]
    }
]

