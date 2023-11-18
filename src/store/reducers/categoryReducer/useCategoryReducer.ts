import { useDispatch } from 'react-redux';

import { useAppSelector } from '../../hooks';
import { setCategoriesAction, setCategoryAction } from '.';
import { CategoryType } from '../../../modules/category/types/CategoryType';

export const useCategoryReducer = () => {
  const dispatch = useDispatch();
  const { categories, category } = useAppSelector((state) => state.categoryReducer);

  const setCategories = (currentCategories: CategoryType[]) => {
    dispatch(setCategoriesAction(currentCategories));
  };

  const setCategory = (currentCategory: CategoryType) => {
    dispatch(setCategoryAction(currentCategory));
  };

  return {
    categories,
    category,
    setCategories,
    setCategory,
  };
};