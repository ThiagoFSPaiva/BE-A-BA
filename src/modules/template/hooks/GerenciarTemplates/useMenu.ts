import React from "react";
import { useState } from "react";
import { MethodsEnum } from "../../../../shared/enums/methods.enum";
import { useRequests } from "../../../../shared/hooks/useRequests";
import { GerenciarTemplateRoutesEnum } from "../../routes";
import { useNavigate } from "react-router-dom";
import { TemplateType } from "../../types/TemplateType";
import { useTemplateAdminReducer } from "../../../../store/reducers/templateAdminReducer/useTemplateAdminReducer";
import { URL_TEMPLATE } from "../../../../shared/constants/urls";

export const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const { setTemplates } = useTemplateAdminReducer();
  const navigate = useNavigate();
  const { request } = useRequests();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedItemId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItemId(null);
  };

  const handleActivate = async (id: number) => {
    const formData = {
      status: 'ativo'
    }

    await request(`${URL_TEMPLATE}/${id}`, MethodsEnum.PATCH, undefined, formData,'Status atualizado!')
    await request<TemplateType[]>(URL_TEMPLATE, MethodsEnum.GET, setTemplates);

    handleMenuClose();
  };

  const handleDesactivate = async (id: number) => {

    const formData = {
      status: 'inativo'
    }

    await request(`${URL_TEMPLATE}/${id}`, MethodsEnum.PATCH, undefined, formData,'Status atualizado!')
    await request<TemplateType[]>(URL_TEMPLATE, MethodsEnum.GET, setTemplates);

    handleMenuClose();

  };


  const handleEditTemplate = async (templateId: number) => {
    navigate(GerenciarTemplateRoutesEnum.TEMPLATE_EDIT.replace(':templateId', `${templateId}`));
  };

  const handleDelete = (id: number) => {
    setSelectedItemId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {

    await request(`${URL_TEMPLATE}/${selectedItemId}`, MethodsEnum.DELETE,undefined,'Template deletado!')
    await request<TemplateType[]>(URL_TEMPLATE, MethodsEnum.GET, setTemplates);
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
    handleEditTemplate,
    handleDelete,
    handleDesactivate,
    handleMenuClose,
    handleMenuOpen,
    handleActivate,
    handleDeleteConfirm,
    handleDeleteCancel,
  }
}