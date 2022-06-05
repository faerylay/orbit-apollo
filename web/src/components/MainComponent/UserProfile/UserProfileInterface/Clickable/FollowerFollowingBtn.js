import React from 'react';
import { Typography, IconButton, Box } from '@mui/material';
import { IconChevronDown } from '@tabler/icons';

import { useStyles } from '../../styles';

const FollowerFollowingBtn = ({ value, title, handleClickOpen }) => {
  const classes = useStyles();

  return (
    <IconButton
      color='inherit'
      className={classes.root}
      sx={{ py: 0.5, mr: 0.7, px: 1.5 }}
      disableRipple
      onClick={handleClickOpen('paper')}
    >
      <Typography className={classes.followCount}>{value}</Typography>
      <Box className={classes.followTitle} >
        <Typography sx={{ fontSize: { xs: 11, sm: 13 }, mx: .5 }}>
          {title}
        </Typography>
        <IconChevronDown size={16} />
      </Box>
    </IconButton>
  );
};

export default FollowerFollowingBtn;
