import { RouteObject } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import Templates from "./screens/TemplatesPage";

export enum TemplateRoutesEnum {
    TEMPLATE = '/templates'
}

export const templateScreens: RouteObject[] = [
    {
        element: <MainLayout />,
        children: [
            {
                path: TemplateRoutesEnum.TEMPLATE,
                element: <Templates />,
            },
        ]
    }

]