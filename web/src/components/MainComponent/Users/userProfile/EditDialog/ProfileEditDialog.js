import React from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import EditBtn from '../Clickable/EditBtn';

const ProfileEditDialog = ({ children, title, isOpen, close }) => {
  return (
    <Dialog maxWidth='sm' scroll='paper' open={isOpen} onClose={close}>
      <DialogTitle>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography sx={{ fontSize: { xs: 16, sm: 20 } }}>{title}</Typography>
          <EditBtn />
        </Box>
      </DialogTitle>

      <DialogContent>
        <Box
          sx={{
            backgroundColor: 'gray',
            minHeight: '160px',
            minWidth: '220px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button size='small' color='primary' variant='outlined' onClick={close}>
          Cancel
        </Button>
        <Button size='small' color='primary' variant='contained'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileEditDialog;
