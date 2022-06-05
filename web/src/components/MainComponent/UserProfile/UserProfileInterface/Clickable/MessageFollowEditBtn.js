import React from 'react';
import { useSelector } from 'react-redux';
import { Grid } from '@mui/material';

import { MessageBtn, CreateFollow, EditDetailsBtn } from '../index';

const MessageFollowEditBtn = ({ getUser }) => {
  const auth = useSelector(state => state?.users?.user);

  return (
    <Grid container sx={{ py: 1 }}>
      {getUser?.id === auth?.id ? null : (
        <Grid item xs={6} sx={{ display: 'flex' }}>
          <MessageBtn getUser={getUser} />
          <CreateFollow getUser={getUser} />
        </Grid>
      )}
      {getUser?.id !== auth?.id ? null : (
        <Grid item xs={12}>
          <EditDetailsBtn getUser={getUser} />
        </Grid>
      )}
    </Grid>
  );
};

export default MessageFollowEditBtn;
