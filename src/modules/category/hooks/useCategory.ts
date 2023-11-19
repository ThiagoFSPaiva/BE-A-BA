import { useEffect, useState } from "react";
import { useCategoryReducer } from "../../../store/reducers/categoryReducer/useCategoryReducer";
import { useRequests } from "../../../shared/hooks/useRequests";
import { MethodsEnum } from "../../../shared/enums/methods.enum";
import { CategoryRoutesEnum } from "../routes";
import { useNavigate } from "react-router-dom";
import { URL_CATEGORY, URL_CATEGORY_ID } from "../../../shared/constants/urls";

export const useCategory = () => {
  const { categories, setCategories } = useCategoryReducer();
  const [categoriesFiltered, setCategoriesFiltered] = useState(categories);
  const [categoryIdDelete, setCategoryIdDelete] = useState<number | undefined>();
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { request } = useRequests();
  
  useEffect(() => {
    if (!categories || categories.length === 0) {
      request(URL_CATEGORY, MethodsEnum.GET, setCategories);
    }
  }, []);


  useEffect(() => {
    setCategoriesFiltered([...categories]);
  }, [categories]);


  const handleOnChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    if (!inputValue) {
      setCategoriesFiltered([...categories]);
    } else {
      setCategoriesFiltered(categories.filter((category) =>
        category.name.toUpperCase().includes(inputValue.toUpperCase()),
      ));
    }
    setPage(1);
  };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleOnClickCategory = () => {
    navigate(CategoryRoutesEnum.CATEGORY_INSERT);
  };


  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setSelectedItemId(id)
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };


  const handleGoToEditCategory = (categoryId: number) => {
    navigate(CategoryRoutesEnum.CATEGORY_EDIT.replace(':categoryId', `${categoryId}`));
  };


  const handleConfirmDeleteCategory = async () => {
    await request(
      URL_CATEGORY_ID.replace('{categoryId}', `${categoryIdDelete}`),
      MethodsEnum.DELETE,
    );
    request(URL_CATEGORY, MethodsEnum.GET, setCategories);
    setCategoryIdDelete(undefined);
  };

  const handleOpenModalDelete = (categoryId: number) => {
    setCategoryIdDelete(categoryId);
  };

  const handleCloseModalDelete = () => {
    setCategoryIdDelete(undefined);
  };



  const lastIndex = page * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const currentCategory = categoriesFiltered.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(categoriesFiltered.length / rowsPerPage);


  return {
    page,
    totalPages,
    currentCategory,
    categoriesFiltered,
    categories,
    anchorEl,
    selectedItemId,
    openModalDelete: !!categoryIdDelete,
    handleMenuClose,
    handleMenuOpen,
    handleOnChangeSearch,
    handleOnClickCategory,
    handleChangePage,
    handleGoToEditCategory,
    handleCloseModalDelete,
    handleOpenModalDelete,
    handleConfirmDeleteCategory
  }
}