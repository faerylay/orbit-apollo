import React from 'react';
import { Box, Dialog, DialogContent } from '@mui/material';

import { EditBtn } from '../';
import { useStyles } from '../../styles';

const ProfileEditDialog = ({ children, isOpen, close }) => {
  const classes = useStyles();

  return (
    <Dialog maxWidth='md' scroll='paper' open={isOpen} onClose={close}>
      <EditBtn close={close} />
      <DialogContent className={classes.imageOnlyDailog}>
        <Box className={classes.imageOnlyDailogContent} >
          {children}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditDialog;
