import React from 'react';
import { useSelector } from 'react-redux';
import { useSubscription } from '@apollo/client'
import { useTheme } from '@mui/material/styles';
import { Box, Avatar, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { IS_USER_ONLINE } from '../../../../graphql'

const UserOnline = ({ following, authUserId }) => {
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);

  const { data, loading } = useSubscription(IS_USER_ONLINE, {
    variables: { authUserId, userId: following?.author?.id },
    skip: !following?.author?.isOnline
  });

  let isUserOnline = following?.author.isOnline
  if (!loading && data) {
    isUserOnline = data?.isUserOnline?.isOnline;
  }

  return (
    <ListItemButton
      sx={{
        borderRadius: `${customization.borderRadius}px`,
        alignItems: 'flex-start',
        backgroundColor: 'inherit',
      }}
      key={following.id}
    >
      <ListItemIcon sx={{ my: 'auto', minWidth: 18, minHeight: 18, display: 'block' }}>
        <Avatar sizes='small' sx={{ width: 32, height: 32, mr: 1 }} />
        <Box sx={{ backgroundColor: isUserOnline ? theme.palette.success.dark : theme.palette.dark.light, width: 10, height: 10, borderRadius: 30, position: 'absolute', top: 45, left: 38 }} />
      </ListItemIcon>
      <ListItemText
        primary={
          <Typography variant={'body1'} color="inherit">
            {following?.author.fullName}
          </Typography>
        }
        secondary={
          <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
            {isUserOnline ? 'Active Now' : 'Not Active'}
          </Typography>
        }
      />
    </ListItemButton >
  )
}
export default UserOnline