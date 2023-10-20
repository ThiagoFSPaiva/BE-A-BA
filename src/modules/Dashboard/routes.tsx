import { RouteObject } from "react-router-dom";
import DashboardPage from "./screens/DashboardPage";
import MainLayout from "../../layout/MainLayout";

export const mainRoutes: RouteObject[] = [
    {
        element: <MainLayout />,
        children: [
            {
                path: "/dashboard",
                element: <DashboardPage />,
            },
        ]
    }

]