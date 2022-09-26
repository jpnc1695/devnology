import { useState } from "react";
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import { Snackbar, AlertProps } from '@mui/material';
import React from "react";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface Props {
  mensagem:string
  tipoMensagem: AlertColor | undefined
}

const Mensagem = ({mensagem,tipoMensagem }:Props) => {

  const [open, setOpen] = useState(true);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  return (
    <div>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={tipoMensagem} sx={{ width: '100%' }}>
            {mensagem}
          </Alert>
      </Snackbar>
    </div>
  )
}

export default Mensagem