import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useQuery, useSubscription } from '@apollo/client';
import { Grid, Box, Paper, Typography } from '@mui/material';

import { FETCH_USER, IS_USER_ONLINE } from '../graphql';
import { PostsByUser } from '../components/MainComponent/Posts';
import {
  CreateFollow,
  Following,
  Followers,
  ProfileImage,
  ProfileCoverImage,
} from '../components/MainComponent/Users';
import { Skeletons } from '../components/MainComponent';

export default function Profile() {
  const auth = useSelector((state) => state?.users?.user);
  const { userId } = useParams();

  const {
    data: { getUser } = {},
    loading,
    error,
  } = useQuery(FETCH_USER, {
    variables: { getUserId: userId },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'cache-first',
  });

  const { data, loadingOnline } = useSubscription(IS_USER_ONLINE, {
    variables: { authUserId: auth?.id, userId: userId },
  });
  let isUserOnline = getUser?.isOnline;
  if (!loadingOnline && data) {
    isUserOnline = data?.isUserOnline?.isOnline;
  }

  if (loading)
    return (
      <Grid container>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item sm={1} md={2} lg={3} />
            <Grid item xs={12} sm={10} md={8} lg={6}>
              <Skeletons count={3} cardContent cardActions />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  if (error) return <Skeletons count={3} cardContent cardActions />;
  if (!getUser) return <Skeletons count={3} cardContent cardActions />;

  if (!loading && getUser)
    return (
      <Grid container>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item sm={1} md={2} lg={3} />
            <Grid item xs={12} sm={10} md={8} lg={6}>
              {/* <Grid item sm={1} md={2} />
            <Grid item xs={12} sm={10} md={8}> */}
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Paper sx={{ height: 250, mb: 1 }}>
                    <ProfileCoverImage getUser={getUser} />
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper sx={{ height: 150, mb: 1, px: 3 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 6,
                        height: '50%',
                      }}
                    >
                      <ProfileImage
                        getUser={getUser}
                        isUserOnline={isUserOnline}
                        userId={userId}
                      />
                      <Typography sx={{ typography: 'h3', py: 4, mt: -1 }}>
                        {getUser?.fullName}
                      </Typography>
                      <CreateFollow getUser={getUser} />
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        height: '50%',
                        width: '100%',
                        justifyContent: 'flex-start',
                        p: 2,
                      }}
                    >
                      <Following getUser={getUser} />
                      <Followers getUser={getUser} />
                      {/* <CreateFollow getUser={getUser} /> */}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
              <PostsByUser getUser={getUser} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
}
