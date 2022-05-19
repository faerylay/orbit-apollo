import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client'
import { useTheme } from '@mui/material/styles';
import { Box, Avatar, List, Divider, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { FETCH_ALL_USERS } from '../../../../graphql'

export default function UsersList() {
  const navigate = useNavigate()
  const theme = useTheme();
  const customization = useSelector((state) => state.customization);

  const { data: { getUsers } = {} } = useQuery(FETCH_ALL_USERS, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first"
  });
  return (
    <>
      <List
        subheader={
          <Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom>
            All Users
            <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
              List
            </Typography>
          </Typography>
        }
      >
        {
          getUsers?.map(user => (
            <ListItemButton
              sx={{
                borderRadius: `${customization.borderRadius}px`,
                alignItems: 'flex-start',
                backgroundColor: 'inherit',
              }}
              onClick={() => navigate(`/profile/${user.id}`)}
              key={user.id}
            >
              <ListItemIcon sx={{ my: 'auto', minWidth: 18, minHeight: 18, display: 'block' }}>
                <Avatar sizes='small' sx={{ width: 32, height: 32, mr: 1 }} />
                {user.isOnline ? (
                  <Box sx={{ backgroundColor: theme.palette.success.dark, width: 10, height: 10, borderRadius: 30, position: 'absolute', top: 45, left: 38 }} />
                ) : (
                  <Box sx={{ backgroundColor: theme.palette.dark.light, width: 10, height: 10, borderRadius: 30, position: 'absolute', top: 45, left: 38 }} />
                )}

              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant={'body1'} color="inherit">
                    {user?.fullName}
                  </Typography>
                }
                secondary={
                  <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                    {user.isOnline ? 'Active Now' : 'Not Active'}
                  </Typography>
                }
              />
            </ListItemButton >
          ))
        }
      </List>
      <Divider sx={{ mt: 0.25, mb: 1.25 }} />
    </>
  )
}
