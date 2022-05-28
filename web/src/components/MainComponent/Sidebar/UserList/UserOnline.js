import React from 'react';
import { Box, Avatar, Typography, ButtonBase } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { useSubscription } from '@apollo/client'
import { IconBrandMessenger, IconUser } from '@tabler/icons'

import { IS_USER_ONLINE } from '../../../../graphql'
import { useStyles } from './styles';

const UserOnline = ({ following, authUserId }) => {
  const navigate = useNavigate()
  const { data, loading } = useSubscription(IS_USER_ONLINE, {
    variables: { authUserId, userId: following?.author?.id },
    skip: !following?.author?.isOnline
  });

  let isUserOnline = following?.author.isOnline
  if (!loading && data) {
    isUserOnline = data?.isUserOnline?.isOnline;
  }
  const classes = useStyles(isUserOnline)

  const goTo = goto => navigate(`/${goto}/${following.author.id}`)
  return (
    <Box className={classes.chatlist__item}>
      <Box className={classes.chatlist__item}>
        <Box className={classes.avatar}>
          <Avatar alt="..." src={following.author.image} />
          <Typography className={classes[isUserOnline ? 'active' : 'isOnline']}></Typography>
        </Box>
        <Box >
          <Typography variant="h5" component="div">{following?.author.fullName} </Typography>
          <Box sx={{ display: 'flex' }}>
            <ButtonBase onClick={() => goTo('profile')} className={classes.btnBase}>
              <Avatar
                variant="rounded"
                className={classes.buttonBaseStyle}
                color="inherit"
              >
                <IconUser stroke={1.5} size="1.1rem" />
              </Avatar>
            </ButtonBase>
            <ButtonBase onClick={() => goTo('chat')} className={classes.btnBase}>
              <Avatar
                variant="rounded"
                className={classes.buttonBaseStyle}
                color="inherit"
              >
                <IconBrandMessenger stroke={1.5} size="1.1rem" />
              </Avatar>
            </ButtonBase>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export default UserOnline