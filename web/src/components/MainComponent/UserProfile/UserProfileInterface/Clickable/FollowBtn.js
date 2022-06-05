import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { IconUserPlus, IconUsers } from '@tabler/icons';
import { Box, IconButton, Typography, useTheme } from '@mui/material';

import { CREATE_FOLLOW, FETCH_USER, FETCH_ALL_USERS, GET_AUTH_USER, GET_FOLLOWED_POSTS, USER_SUGGESTION } from '../../../../../graphql';
import { NotificationType, HOME_PAGE_POSTS_LIMIT } from '../../../../../constants';
import useNotifications from '../../../../../hooks/useNotifications';


export default function FollowBtn({ getUser }) {
  const [loading, setLoading] = useState(false);
  const auth = useSelector(state => state?.users?.user);
  const theme = useTheme();
  const notification = useNotifications();

  const [createFollow] = useMutation(CREATE_FOLLOW, {
    variables: {
      input: {
        authorId: getUser?.id,
      },
    },
    refetchQueries: [
      { query: GET_AUTH_USER },
      { query: FETCH_ALL_USERS },
      { query: USER_SUGGESTION },
      { query: FETCH_USER, variables: { getUserId: getUser?.id } },
      {
        query: GET_FOLLOWED_POSTS,
        variables: {
          userId: auth?.id,
          offset: 0,
          limit: HOME_PAGE_POSTS_LIMIT,
        },
      },
    ],
  });

  const isFollowing = getUser?.followers?.find(
    user => user?.follower?.id === auth?.id
  );
  const followed = async () => {
    setLoading(true);
    const { data } = await createFollow();
    if (auth?.id === getUser?.id) return setLoading(false);
    if (auth?.id !== getUser?.id) {
      await notification.toggle({
        user: getUser,
        hasDone: isFollowing,
        notificationType: NotificationType.FOLLOW,
        notificationTypeId: data.createFollow ? data.createFollow.id : null,
      });
    }
    setLoading(false);
  };
  const followBack = getUser?.following?.find(
    user => user?.author?.id === auth?.id
  );

  return (
    <>
      <IconButton
        color='inherit'
        size='small'
        disableRipple
        onClick={followed}
        disabled={loading}
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
          width: '90%',
          height: 32,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isFollowing ? <IconUsers size={16} /> : <IconUserPlus size={16} />}
          <Typography sx={{ fontSize: 12, ml: 1 }}>
            {isFollowing ? 'Followed' : followBack ? 'Follow Back' : 'Follow'}
          </Typography>
        </Box>
      </IconButton>
    </>
  );
}
