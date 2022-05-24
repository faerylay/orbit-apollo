import React from 'react';
import { Typography, IconButton, Box } from '@mui/material';
import { IconChevronDown } from '@tabler/icons';

import { useStyles } from '../styles';

const FollowerFollowingBtn = ({ value, title, handleClickOpen }) => {
  const classes = useStyles();

  return (
    <IconButton
      color='inherit'
      className={classes.root}
      size='small'
      sx={{ py: 0.2, mr: 0.7 }}
      disableRipple
      onClick={handleClickOpen('paper')}
    >
      <Typography sx={{ fontSize: { xs: 16, sm: 20 } }}>{value}</Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{ fontSize: { xs: 10, sm: 14 }, mr: 0.2, ml: 0.5 }}>
          {title}
        </Typography>
        <IconChevronDown size={16} />
      </Box>
    </IconButton>
  );
};

export default FollowerFollowingBtn;
