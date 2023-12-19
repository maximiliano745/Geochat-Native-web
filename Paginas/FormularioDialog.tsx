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

  const handleClose = (confirmed: boolean) => {
    setOpenDialog(false);
    onClose(confirmed); // Llamada a la función onClose para actualizar el estado en el componente padre
  };

  useEffect(() => {
    setOpenDialog(showDialog);
  }, [showDialog]);

  return (
    <Dialog open={openDialog} onClose={() => handleClose(false)}>
      <DialogTitle>Confirmacion</DialogTitle>
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
        {/* <Button onClick={handleClose}>Cancela</Button>
        <Button onClick={handleClose}>Confirma</Button> */}
        <Button onClick={() => handleClose(false)}>Cancela</Button>
        <Button onClick={() => handleClose(true)}>Confirma</Button>
      </DialogActions>
    </Dialog>
  );
}
