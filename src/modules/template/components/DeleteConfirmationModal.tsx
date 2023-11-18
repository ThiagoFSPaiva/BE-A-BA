import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import { ReactNode } from "react";

export const DeleteConfirmationModal = ({
  children,
  isOpen,
  onConfirm,
  onCancel,

}: {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  children?: ReactNode;
}) => {
  return (
    <Dialog open={isOpen} onClose={onCancel}>
      <Box sx={{bgcolor: theme => theme.palette.background.paper, p: 1}}>
        <DialogTitle variant="h6">Tem certeza de que deseja excluir este item?</DialogTitle>
        <DialogContent >
          {children}
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onCancel} color="primary">
            Cancelar
          </Button>
          <Button onClick={onConfirm} variant="contained" color="error">
            Excluir
          </Button>
        </DialogActions>

      </Box>
    </Dialog>
  );
};