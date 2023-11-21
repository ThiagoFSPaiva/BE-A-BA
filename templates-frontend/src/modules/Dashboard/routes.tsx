import { RouteObject } from "react-router-dom";
import DashboardPage from "./screens/DashboardPage";
import MainLayout from "../../layout/MainLayout";

export const dashboardRoute: RouteObject[] = [
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