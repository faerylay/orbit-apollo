import React from 'react';
import { Grid, Paper, Skeleton, useTheme } from '@mui/material';
import { useLocation, useParams } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { useSelector } from 'react-redux';

import { ChatUserList, ChatContent, ChatProfileDetail } from '../components/MainComponent/Chat/';
import { UserDetailDrawer, ConversationDrawer } from '../components/MainComponent/Chat/ChatDrawer/';
import { NotSelected } from '../components/MainComponent'
import { FETCH_USER } from '../graphql';

const ChatPage = () => {
  const theme = useTheme()
  const chat = useSelector(state => state.chat)
  const location = useLocation()
  const { userId } = useParams();
  const checkPath = location.pathname === '/chat' || location.pathname === '/chat/';
  const { data: { getUser } = {}, loading } = useQuery(FETCH_USER, {
    variables: { getUserId: userId },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first"
  })

  if (loading) {
    return <Skeleton />
  }
  const userDetailRender = () => (
    <>
      <Grid item xs={12} md={7} lg={6} sx={{ [theme.breakpoints.down('md')]: { display: 'none' } }}>
        <ChatContent getUser={getUser} />
      </Grid>
      <Grid item lg={3} sx={{ [theme.breakpoints.down('lg')]: { display: 'none' } }}>
        <ChatProfileDetail getUser={getUser} />
      </Grid>
    </>
  )

  return (
    <Grid container component={Paper}>
      <Grid item xs={12} md={5} lg={3}>
        <ChatUserList getUser={getUser} />
      </Grid>
      {checkPath ? <NotSelected /> : userDetailRender()}
      <ConversationDrawer drawerOpen={chat.conversationOpened} getUser={getUser} />
      <UserDetailDrawer drawerOpen={chat.profileOpened} getUser={getUser} />
    </Grid>
  );
}

export default ChatPage;