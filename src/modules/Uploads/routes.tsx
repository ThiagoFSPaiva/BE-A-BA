import { RouteObject } from "react-router-dom";
import MainLayout from "../../layout/MainLayout";
import { UploadsPage } from "./screens/UploadsPage";

export enum UploadsRoutesEnum {
    Uploads = '/uploads',
}

export const uploadsScreen: RouteObject[] = [
    {
        element: <MainLayout />,
        children: [
            {
                path: UploadsRoutesEnum.Uploads,
                element: <UploadsPage />,
            }
        ]
    }

]