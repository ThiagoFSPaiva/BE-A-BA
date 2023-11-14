import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

export const DeleteConfirmationModal = ({
    isOpen,
    onConfirm,
    onCancel,
  }: {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
  }) => {
    return (
      <Dialog open={isOpen} onClose={onCancel}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          Deseja realmente excluir o item selecionado?
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={onCancel} color="primary">
            Cancelar
          </Button>
          <Button onClick={onConfirm} variant="contained" color="error">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    );
  };