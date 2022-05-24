import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';

import MessageBtn from '../Clickable/MessageBtn';
import CreateFollow from '../Clickable/FollowBtn';
import EditDetailsBtn from '../Clickable/EditDetailsBtn';

const MessageFollowEditInterface = ({ getUser }) => {
  const auth = useSelector(state => state?.users?.user);

  return (
    <Grid container spacing={2} sx={{ px: 2 }}>
      {getUser?.id === auth?.id ? null : (
        <>
          <Grid item xs={6}>
            <MessageBtn getUser={getUser} />
          </Grid>
          <Grid item xs={6}>
            <CreateFollow getUser={getUser} />
          </Grid>
        </>
      )}
      {getUser?.id !== auth?.id ? null : (
        <Grid item xs={12}>
          <EditDetailsBtn getUser={getUser} />
        </Grid>
      )}
    </Grid>
  );
};

export default MessageFollowEditInterface;
