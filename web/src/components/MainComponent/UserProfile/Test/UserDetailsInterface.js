import React from 'react';
import { Typography, Box, Fab } from '@mui/material';
import { IconPhoto } from '@tabler/icons'
import { useStyles } from '../styles'


const UserDetailsInterface = () => {
  const classes = useStyles()
  return (
    <Box sx={{ paddingBlock: 2, paddingInline: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
        <Typography variant='h5' sx={{ mr: 2 }}>
          Sex -{' '}
        </Typography>
        <Typography variant='body1'>Male</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
        <Typography variant='h5' sx={{ mr: 2 }}>
          From -{' '}
        </Typography>
        <Typography variant='body1'>Myanmar</Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
        <Typography variant='h5' sx={{ mr: 2 }}>
          Live In -{' '}
        </Typography>
        <Typography variant='body1'>Japan</Typography>
      </Box>

      <Box sx={{ px: 2, py: 2.5 }}>
        <Fab
          className={classes.photos}
          size='small'
          variant='extended'
          aria-label='photo gallery'
        >
          <IconPhoto /> &nbsp; Photos
        </Fab>
      </Box>
    </Box>
  );
};

export default UserDetailsInterface;
