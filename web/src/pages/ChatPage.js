import React from 'react';
import { Grid, Paper } from '@mui/material';
import { useLocation } from "react-router-dom";

import ChatList from '../components/MainComponent/Chat/ChatList';
import ChatUserDetail from '../components/MainComponent/Chat'
import { NotSelected } from '../components/MainComponent'

const Chat = () => {
  const location = useLocation()
  const checkPath = location.pathname === '/chat' || location.pathname === '/chat/';
  return (
    <Grid container component={Paper} >
      <Grid item xs={12} md={5} lg={3}  >
        <ChatList />
      </Grid>
      {checkPath ? <NotSelected /> : <ChatUserDetail />}
    </Grid>
  );
}

export default Chat;