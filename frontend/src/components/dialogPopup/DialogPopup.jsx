import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

import { useTranslation } from 'react-i18next';

function DialogPopup({
  title,
  content,
  cancel,
  confirm,
  openState,
  confirmFunction,
  closeFunction
}) {
  const { t } = useTranslation();
  let remainingTime = 0;

  return (
    <Dialog
      open={openState}
      onClose={closeFunction}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description" sx={{ mb: 2 }}>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => closeFunction(remainingTime)} color="error">
          {cancel}
        </Button>
        <Button onClick={() => confirmFunction()}>{confirm}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogPopup;
