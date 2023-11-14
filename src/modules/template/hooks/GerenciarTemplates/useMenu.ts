import React from "react";
import { useState } from "react";

export const useMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
    const [isDeleteDialogOpen, setDeleteDialogOpen] = React.useState(false);




    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: number) => {
        setAnchorEl(event.currentTarget);
        setSelectedItemId(id);
      };
    
      const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedItemId(null);
      };
    
      const handleActivate = (id: number) => {
        console.log("ativando " + id)
        handleMenuClose();
      };
    
      const handleDeactivate = (id: number) => {
        console.log("desativando " + id)
        handleMenuClose();
      };
    
      const handleEdit = (id: number) => {
        console.log("editando " + id)
        handleMenuClose();
      };
      const handleDelete = (id: number) => {
        setSelectedItemId(id);
        setDeleteDialogOpen(true);
      };
    
      const handleDeleteConfirm = () => {
        console.log("deletando " + selectedItemId);
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
        handleEdit,
        handleDelete,
        handleDeactivate,
        handleMenuClose,
        handleMenuOpen,
        handleActivate,
        handleDeleteConfirm,
        handleDeleteCancel,
      }
}