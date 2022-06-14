import React from 'react';
import { Grid, Paper, useTheme } from '@mui/material';
import { useLocation } from "react-router-dom";

import { ChatUserList, ChatContent, ChatProfileDetail } from '../components/MainComponent/Chat/';
import { NotSelected } from '../components/MainComponent'


const ChatPage = () => {
  const theme = useTheme()

  const location = useLocation()

  const checkPath = location.pathname === '/chat' || location.pathname === '/chat/';
  const userDetailRender = () => (
    <>
      <Grid item xs={12} md={7} lg={6} sx={{ [theme.breakpoints.down('md')]: { display: 'none' } }}>
        <ChatContent />
      </Grid>
      <Grid item lg={3} sx={{ [theme.breakpoints.down('lg')]: { display: 'none' } }}>
        <ChatProfileDetail />
      </Grid>
    </>
  )

  return (
    <Grid container component={Paper}>
      <Grid item xs={12} md={5} lg={3}>
        <ChatUserList />
      </Grid>
      {checkPath ? <NotSelected /> : userDetailRender()}
    </Grid>
  );
}

export default ChatPage;