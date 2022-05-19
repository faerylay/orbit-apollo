import React from 'react'
import moment from 'moment';
import { Avatar, Grid, ListItem, ListItemAvatar, ListItemSecondaryAction, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { useApolloClient } from '@apollo/client'
import { styled } from '@mui/material/styles';

import useClickOutSide from '../../../../hooks/useClickOutSide'
import NotificationMenu from './NotificationMenu'

import { UPDATE_NOTIFICATION_SEEN, ME, GET_USER_NOTIFICATION } from '../../../../graphql'
import { NOTI_PAGE_NOTIFICATION_LIMIT } from '../../../../constants';
import { textEllipsis } from './styles'

const NotificationList = ({ notification, close }) => {
  const ref = React.useRef(null);
  useClickOutSide(ref, close);

  const navigate = useNavigate()
  const client = useApolloClient()
  const auth = useSelector(state => state?.users?.user)

  let initialRender;
  let goTo;
  let description;
  if (notification?.like) {
    initialRender = 'liked your Post'
    goTo = `/single-post/${notification?.like?.post?.id}`
    description = notification?.like?.post?.title
  }
  else if (notification?.commentlikes) {
    initialRender = 'liked your comment '
    goTo = `/single-post/${notification?.comment?.post?.id}`
    description = notification?.commentlikes?.comment?.comment
  }
  else if (notification?.comment) {
    initialRender = 'commented your post '
    goTo = `/single-post/${notification?.comment?.post?.id}`
    description = notification?.comment?.comment
  }
  else if (notification?.follow) {
    initialRender = 'following you'
    goTo = `/profile/${notification?.follow?.follower}`
    description = 'Follow Back'
  } else if (notification?.post) {
    initialRender = 'added a post'
    goTo = `/single-post/${notification?.post?.id}`
    description = notification?.post?.title
  } else {
    initialRender = 'ok'
    goTo = 'ok'
    description = 'ok'
  }
  const updateNotificationSeen = async () => {
    try {
      await client.mutate({
        mutation: UPDATE_NOTIFICATION_SEEN,
        variables: {
          input: {
            userId: auth?.id,
            notiId: notification?.id
          }
        },
        refetchQueries: () => [
          { query: ME },
          {
            query: GET_USER_NOTIFICATION,
            variables: {
              userId: auth?.id,
              offset: 0,
              limit: NOTI_PAGE_NOTIFICATION_LIMIT,
            }
          }
        ]
      });
      navigate(goTo)
    } catch (error) {
      console.log(error, 'updateNotification Error')
    }
  }
  const ListItemWrapper = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    background: notification.seen ? theme.palette.background.paper : theme.palette.primary.light,
    padding: 8,
    '&:hover': {
      background: theme.palette.secondary.light
    },
    '& .MuiListItem-root': {
      padding: 0
    },
  }));

  return (
    <ListItemWrapper ref={ref} onClick={() => updateNotificationSeen()} >
      <ListItem alignItems="center">
        <ListItemAvatar>
          <Avatar alt={notification?.author?.fullName} src={notification?.author?.image} sx={{ border: 1, borderColor: 'dodgerblue', width: 44, height: 44 }} />
        </ListItemAvatar>
        <ListItemText primary={
          <Typography variant='subtitle1' gutterBottom >{notification?.author?.fullName}
            <Typography variant="caption" sx={{ pl: 1 }}>{initialRender}</Typography>
          </Typography>
        }
          secondary={
            <>
              <Typography sx={textEllipsis} variant="caption">{description}</Typography>
              <Typography variant="caption" >
                {moment.unix(notification?.createdAt).fromNow()}
              </Typography>
            </>
          }
        />
        <ListItemSecondaryAction>
          <Grid container justifyContent="flex-end">
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: -2 }}>
              <NotificationMenu noti={notification} refs={ref} close={close} />
            </Grid>
          </Grid>
        </ListItemSecondaryAction>
      </ListItem>
    </ListItemWrapper>
  );
};

export default NotificationList;
