import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/styles';
import { IconMessageCircle2 } from '@tabler/icons';

const MessageBtn = ({ getUser }) => {
  const theme = useTheme();

  return (
    <>
      <IconButton
        color='inherit'
        size='small'
        disableRipple
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
          <IconMessageCircle2 size={16} />
          <Typography sx={{ fontSize: 12, ml: 1 }}>Message</Typography>
        </Box>
      </IconButton>
    </>
  );
};

export default MessageBtn;
