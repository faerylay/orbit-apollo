import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useQuery, useSubscription } from '@apollo/client';
import { Paper, Container } from '@mui/material';

import { FETCH_USER, IS_USER_ONLINE } from '../../graphql';
import { PostsByUser } from '../../components/MainComponent/Posts';
import { Skeletons } from '../../components/MainComponent';

import {
  UserProfileInterface,
  MessageFollowEditInterface,
  UserDetailsInterface,
} from '../../components/MainComponent/Users/userProfile';

export default function Profile() {
  const { userId } = useParams();
  const auth = useSelector(state => state?.users?.user);

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

  if (loading || error || !getUser)
    return (
      <Container maxWidth={'sm'} sx={{ padding: 0 }}>
        <Skeletons count={3} cardContent cardActions />
      </Container>
    );

  if (!loading && getUser)
    return (
      <Container maxWidth={'sm'} sx={{ padding: 0 }}>
        <Paper sx={{ mb: 1 }}>
          <UserProfileInterface
            userId={userId}
            isUserOnline={isUserOnline}
            getUser={getUser}
          />

          <MessageFollowEditInterface getUser={getUser} />

          <UserDetailsInterface />
        </Paper>
        <PostsByUser getUser={getUser} />
      </Container>
    );
}
