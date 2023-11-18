import React from "react";
import { useState } from "react";
import { MethodsEnum } from "../../../../shared/enums/methods.enum";
import { useRequests } from "../../../../shared/hooks/useRequests";
import { GerenciarTemplateRoutesEnum } from "../../routes";
import { useNavigate } from "react-router-dom";

export const useMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
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

  const handleActivate = (id: number) => {
    const formData = {
      status: 'ativo'
    }

    request(`http://localhost:3000/template/${id}`, MethodsEnum.PATCH, undefined, formData)
      .then((response) => {
        console.log(response)
      })
      .catch((erro) => {
        console.log(erro)
      })

    handleMenuClose();
  };

  const handleDeactivate = (id: number) => {

    const formData = {
      status: 'inativo'
    }

    request(`http://localhost:3000/template/${id}`, MethodsEnum.PATCH, undefined, formData)

    handleMenuClose();
  };


  const handleEditTemplate = async (templateId: number) => {
    navigate(GerenciarTemplateRoutesEnum.TEMPLATE_EDIT.replace(':templateId', `${templateId}`));
  };

  // const handleEdit = (id: number) => {
  //   console.log("editando " + id)
  //   handleMenuClose();
  // };
  const handleDelete = (id: number) => {
    setSelectedItemId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {

    request(`http://localhost:3000/template/${selectedItemId}`, MethodsEnum.DELETE)
    .then((response) => {
      console.log(response)
    })
    .catch((erro) => {
      console.log(erro)
    })

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
    handleDeactivate,
    handleMenuClose,
    handleMenuOpen,
    handleActivate,
    handleDeleteConfirm,
    handleDeleteCancel,
  }
}