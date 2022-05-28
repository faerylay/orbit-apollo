import React from 'react'
import { Grid, Skeleton, useTheme } from '@mui/material';
import { useParams } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import { FETCH_USER } from '../../../graphql'

import ChatProfile from './ChatProfile'
import ChatContent from './ChatContent'

const Chat = () => {
  const auth = useSelector(state => state?.users?.user);
  const theme = useTheme()
  const checkMdSide = { [theme.breakpoints.down('lg')]: { display: 'none' } }
  const { userId } = useParams();
  const { data: { getUser } = {}, loading } = useQuery(FETCH_USER, {
    variables: { getUserId: userId },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first"
  })
  if (loading) {
    return (
      <Skeleton />
    );
  }
  return (
    <>
      <Grid item xs={12} md={7} lg={6} sx={{ [theme.breakpoints.down('md')]: { display: 'none' } }}>
        <ChatContent auth={auth} getUser={getUser} />
      </Grid>
      <Grid item lg={3} sx={checkMdSide}>
        <ChatProfile receiver={getUser} />
      </Grid>
    </>
  )
}

export default Chat