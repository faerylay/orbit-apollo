import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { IconPencil } from '@tabler/icons';

import { UserDetailsEditDialog } from '../index';
import { useStyles } from '../../styles';

const EditDetailsBtn = ({ getUser }) => {
  const classes = useStyles();
  const [isEditOpen, setIsEditOpen] = React.useState(false);

  return (
    <>
      <IconButton
        color='inherit'
        size='small'
        disableRipple
        onClick={() => setIsEditOpen(true)}
        className={classes.followEditBtn}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconPencil size={16} />
          <Typography sx={{ fontSize: 12, ml: 1 }}>Edit Profile</Typography>
        </Box>
      </IconButton>

      <UserDetailsEditDialog
        getUser={getUser}
        open={isEditOpen}
        handleClose={() => setIsEditOpen(false)}
      />
    </>
  );
};

export default EditDetailsBtn;
