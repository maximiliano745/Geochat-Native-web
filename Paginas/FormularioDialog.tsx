import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

export default function FormDialog({ open: showDialog, onClose }) {
  const [openDialog, setOpenDialog] = useState(showDialog);

  const handleClose = () => {
    setOpenDialog(false);
    onClose(); // Llamada a la función onClose para actualizar el estado en el componente padre
  };

  useEffect(() => {
    setOpenDialog(showDialog);
  }, [showDialog]);

  return (
    <Dialog open={openDialog} onClose={handleClose}>
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Ingrese la descrpción del ICONO:
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Alerta"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleClose}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}
