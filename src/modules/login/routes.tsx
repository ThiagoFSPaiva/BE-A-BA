import { RouteObject } from "react-router-dom";
import AppLayout from "../../layout/AppLayout";
import LoginPage from "./screens/LoginPage";


export const loginRoutes: RouteObject[] = [
    {
        element: <AppLayout />,
        children: [
            {
                path: "/login",
                element: <LoginPage />,
            },
        ]
    }

]

