import { RouteObject } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import Templates from "./screens/TemplatesPage";
import { InsertTemplate } from "./screens/InsertTemplate";
import { GerenciarTemplatesPage } from "./screens/GerenciarTemplates/GerenciarTemplatesPage";

export enum TemplateRoutesEnum {
    TEMPLATE = '/templates',
    TEMPLATE_INSERT = '/templates/insert',
}

export enum GerenciarTemplateRoutesEnum {
    TEMPLATE_GERENCIAR = '/templates/gerenciar',
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

export const gerenciarScreen: RouteObject[] = [
    {
        element: <MainLayout />,
        children: [
            {
                path: GerenciarTemplateRoutesEnum.TEMPLATE_GERENCIAR,
                element: <GerenciarTemplatesPage />,
            }
        ]
    }

]