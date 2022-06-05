import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';

import { ProfileCoverImage, ProfileImage, Followers, Following, TabComponent, MessageFollowEditBtn } from './UserProfileInterface';
import { useStyles } from './styles';

const UserProfileInterface = ({ auth, getUser, userId, isUserOnline }) => {
  const classes = useStyles({ isUserOnline, auth, userId })

  return (
    <>
      <Box className={classes.coverImageComponent} >
        <ProfileCoverImage getUser={getUser} />
      </Box>

      <Container className={classes.userDetail} >
        <Grid container paddingTop={2} paddingBottom={1}>
          <Grid item xs={4} className={classes.userProfileGrid}  >
            <Box className={classes.profileImages} >
              <ProfileImage getUser={getUser} />
            </Box>
          </Grid>
          <Grid item xs={8} >
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }} >
              <Box
                sx={{
                  mb: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: { xs: 'center', sm: 'left' }
                }}
              >
                <Typography
                  variant='h3'
                  sx={{ fontSize: { xs: '1.5rem', sm: '1.5rem' } }}
                  marginRight={1}
                >
                  {getUser?.fullName}
                </Typography>
              </Box>

              <Box sx={{ width: { xs: '100%', sm: '60%', md: '50%' } }}>
                <Grid container >
                  <Grid item xs={12} sx={{ display: 'flex' }}>
                    <Following getUser={getUser} />
                    <Followers getUser={getUser} />
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Box sx={{ width: { xs: '100%', sm: '60%', md: '50%' } }}>
              <MessageFollowEditBtn getUser={getUser} />
            </Box>
          </Grid>
          <Grid container>
            <Grid item xs={4} />
            <Grid item xs={8} >
              <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                <Typography variant='h5' align='center' >
                  I'm Junior Web Developer
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Box>
        <TabComponent getUser={getUser} />
      </Box>
    </>
  );
};

export default UserProfileInterface;
