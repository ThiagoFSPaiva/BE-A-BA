import { RouteObject } from 'react-router-dom';
import { CategoryPage } from './screens/CategoryPage';
import { CategoryInsert } from './screens/CategoryInsert';
import MainLayout from '../../layout/MainLayout';


export enum CategoryRoutesEnum {
  CATEGORY = '/category',
  CATEGORY_INSERT = '/category/insert',
  CATEGORY_EDIT = '/category/:categoryId',
}

export const categoryScreens: RouteObject[] = [

{
    element: <MainLayout />,
    children: [
        {
          path: CategoryRoutesEnum.CATEGORY,
          element: <CategoryPage />,
        },
        {
          path: CategoryRoutesEnum.CATEGORY_INSERT,
          element: <CategoryInsert />,
        },
        {
          path: CategoryRoutesEnum.CATEGORY_EDIT,
          element: <CategoryInsert />,
        },
    ]
}


];