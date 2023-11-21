import React, { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert, { AlertColor } from '@mui/material/Alert';
import { useGlobalReducer } from '../../store/reducers/globalReducer/useGlobalReducer';
import { Stack } from '@mui/material';

interface Notification {
  message: any;
  type: AlertColor | undefined;
}

export const NotificationComponent: React.FC = () => {
  const { notification } = useGlobalReducer();
  const [open, setOpen] = React.useState(!!notification?.message);


  useEffect(() => {
    if (notification?.message && notification.type) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [notification]);

  const handleClose = (event?: Event | React.SyntheticEvent<any, Event>, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  if (!notification?.message) {
    return null;
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
    >
      <Alert onClose={handleClose} severity={notification.type} sx={{ width: '100%' }}>
        {notification.message}
      </Alert>
    </Snackbar>
  );
};