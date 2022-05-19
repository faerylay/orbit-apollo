import React from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { List, Divider, Typography, Box } from '@mui/material';
import UserOnline from './UserOnline';

const UserFollowed = () => {
  const theme = useTheme();
  const auth = useSelector(state => state?.users?.user)

  return (
    <>
      <List
        subheader={
          <Typography variant="caption" sx={{ ...theme.typography.menuCaption }} display="block" gutterBottom>
            {auth?.fullName}
            <Typography variant="caption" sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
              Following User
            </Typography>
          </Typography>
        }
      >
        {auth?.following?.map(following => (
          <Box key={following.id}>
            <UserOnline following={following} authUserId={auth?.id} />
          </Box>
        ))}
      </List>
      <Divider sx={{ mt: 0.25, mb: 1.25 }} />
    </>
  )
}
export default UserFollowed