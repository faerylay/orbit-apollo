import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { IconPencil } from '@tabler/icons';

import UserDetailsEditDialog from '../EditDialog/UserDetailsEditDialog';

const EditDetailsBtn = ({ getUser }) => {
  const theme = useTheme();
  const [isEditOpen, setIsEditOpen] = React.useState(false);

  return (
    <>
      <IconButton
        color='inherit'
        size='small'
        disableRipple
        onClick={() => setIsEditOpen(true)}
        sx={{
          ...theme.typography.commonAvatar,
          ...theme.typography.largeAvatar,
          transition: 'all .2s ease-in-out',
          background: theme.palette.primary.light,
          color: theme.palette.primary.dark,
          '&[aria-controls="menu-list-grow"],&:hover': {
            background: theme.palette.primary.dark,
            color: theme.palette.primary.light,
          },
          width: '100%',
          height: 36,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconPencil size={16} />
          <Typography sx={{ fontSize: 12, ml: 1 }}>Edit Profile</Typography>
        </Box>
      </IconButton>

      <UserDetailsEditDialog
        open={isEditOpen}
        handleClose={() => setIsEditOpen(false)}
      />
    </>
  );
};

export default EditDetailsBtn;
