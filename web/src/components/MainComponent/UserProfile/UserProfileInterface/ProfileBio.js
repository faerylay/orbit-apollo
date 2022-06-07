import React from 'react';
import { Box, Typography } from '@mui/material';

const profileBio = ({ getUser }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'start' }}>
      <Typography variant='h5' align='center' color="black" >
        {getUser?.bio ? getUser.bio : 'Not Bio Yet'}
      </Typography>
    </Box>
  )
}

export default profileBio