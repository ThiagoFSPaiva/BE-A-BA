import React from "react";
import { useState } from "react";
import { MethodsEnum } from "../../../../shared/enums/methods.enum";
import { useRequests } from "../../../../shared/hooks/useRequests";
import { useNavigate } from "react-router-dom";
import { URL_UPLOAD_GET_ALL_USERS, URL_USER } from "../../../../shared/constants/urls";
import { useUserReducer } from "../../../../store/reducers/userReducer/useUserReducer";
import { UserType } from "../../../login/types/UserType";
import { UsuarioRoutesEnum } from "../routes";

export const useActionsUser = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const { setUsers } = useUserReducer();
  const navigate = useNavigate();
  const { request } = useRequests();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedItemId(id);
  };


  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItemId(null);
  };

  const handleActivate = async (id: string) => {
    const formData = {
      status: 'ativo'
    }

    await request(`${URL_USER}/${id}`, MethodsEnum.PATCH, undefined, formData,'Status atualizado!')
    await request<UserType[]>(URL_UPLOAD_GET_ALL_USERS, MethodsEnum.GET, setUsers);

    handleMenuClose();
  };

  const handleDesactivate = async (id: string) => {

    const formData = {
      status: 'inativo'
    }

    await request(`${URL_USER}/${id}`, MethodsEnum.PATCH, undefined, formData,'Status atualizado!')
    await request<UserType[]>(URL_UPLOAD_GET_ALL_USERS, MethodsEnum.GET, setUsers);

    handleMenuClose();

  };


  const handleEditUser = async (userId: string) => {
    navigate(UsuarioRoutesEnum.USUARIO_EDIT.replace(':userId', `${userId}`));
  };

  const handleDelete = (id: string) => {
    setSelectedItemId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {

    await request(`${URL_USER}/${selectedItemId}`, MethodsEnum.DELETE,undefined,'Usuário deletado!')
    await request<UserType[]>(URL_UPLOAD_GET_ALL_USERS, MethodsEnum.GET, setUsers);
    setSelectedItemId(null)

    setDeleteDialogOpen(false);
    handleMenuClose();
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
  };

  return {
    anchorEl,
    selectedItemId,
    isDeleteDialogOpen,
    handleEditUser,
    handleDelete,
    handleDesactivate,
    handleMenuClose,
    handleMenuOpen,
    handleActivate,
    handleDeleteConfirm,
    handleDeleteCancel,
  }
}