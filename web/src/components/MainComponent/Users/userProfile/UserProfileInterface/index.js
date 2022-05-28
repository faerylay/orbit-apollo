import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MaleIcon from '@mui/icons-material/Male';

import ProfileCoverImage from './ProfileCoverImage';
import ProfileImage from './ProfileImage';
import Following from './Following';
import Followers from './Followers';

const UserProfileInterface = ({ getUser, userId, isUserOnline }) => {
  const theme = useTheme();
  const auth = useSelector(state => state?.users?.user);

  return (
    <>
      <Box sx={{ height: 150, position: 'relative' }}>
        <ProfileCoverImage getUser={getUser} />
      </Box>

      <Container
        sx={{
          maxWidth: { xs: '300px', sm: '100%' },
          padding: { xs: 0, sm: 0 },
        }}
      >
        <Grid container paddingY={2.5}>
          <Grid
            item
            xs={4}
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                shrink: 0,
                width: { xs: '70%', sm: 80, position: 'relative' },
                borderRadius: '100%',
                overflow: 'hidden',
                border: `2px solid ${
                  isUserOnline && auth?.id !== userId
                    ? theme.palette.success.dark
                    : 'dodgerblue'
                }`,
              }}
            >
              <ProfileImage getUser={getUser} />
            </Box>
          </Grid>
          <Grid
            item
            xs={8}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'center', sm: 'left' },
              }}
            >
              <Typography
                variant='h3'
                sx={{ fontSize: { xs: '1.1rem', sm: '1.5rem' } }}
                marginRight={1}
              >
                {getUser?.fullName}
              </Typography>
              <MaleIcon />
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: { xs: 'center', sm: 'left' },
              }}
            >
              <Following getUser={getUser} />
              <Followers getUser={getUser} />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default UserProfileInterface;
