import React from 'react';
import { Typography, Box, Fab } from '@mui/material';
import PhotoLibraryRoundedIcon from '@mui/icons-material/PhotoLibraryRounded';
import VideoLibraryRoundedIcon from '@mui/icons-material/VideoLibraryRounded';

const UserDetailsInterface = () => {
  return (
    <>
      <Typography variant='body1' align='center' sx={{ p: 1, my: 2 }}>
        Bio text
      </Typography>

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
          sx={{ mr: 1, boxShadow: 'none' }}
          size='small'
          variant='extended'
          aria-label='photo gallery'
        >
          <PhotoLibraryRoundedIcon sx={{ mr: 1 }} /> Photos
        </Fab>
        <Fab
          sx={{ boxShadow: 'none' }}
          size='small'
          variant='extended'
          aria-label='video gallery'
        >
          <VideoLibraryRoundedIcon sx={{ mr: 1 }} /> Videos
        </Fab>
      </Box>
    </>
  );
};

export default UserDetailsInterface;
