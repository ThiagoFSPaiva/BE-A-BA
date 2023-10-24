import { RouteObject } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import Templates from "./screens/TemplatesPage";
import { InsertTemplate } from "./screens/InsertTemplate";

export enum TemplateRoutesEnum {
    TEMPLATE = '/templates',
    TEMPLATE_INSERT = '/templates/insert',
}

export const templateScreens: RouteObject[] = [
    {
        element: <MainLayout />,
        children: [
            {
                path: TemplateRoutesEnum.TEMPLATE,
                element: <Templates />,
            },
            {
                path: TemplateRoutesEnum.TEMPLATE_INSERT,
                element: <InsertTemplate />,
            },
        ]
    }

]