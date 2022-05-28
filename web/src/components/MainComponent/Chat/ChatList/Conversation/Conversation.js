import React, { useEffect } from "react";
import { Box, IconButton, Typography } from '@mui/material'
import { IconSearch, IconDots } from '@tabler/icons'
import { useQuery } from "@apollo/client";

import { ConversationItem } from "./index";

import { useStyles } from "../styles";
import { GET_CONVERSATIONS, GET_NEW_CONVERSATIONS_SUBSCRIPTION } from '../../../../../graphql'

const Conversation = ({ orient, auth }) => {
  const classes = useStyles(orient)
  const { subscribeToMore, data, loading } = useQuery(GET_CONVERSATIONS, {
    variables: { authUserId: auth?.id },
  });


  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: GET_NEW_CONVERSATIONS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const { newConversation } = subscriptionData.data;
        const oldConversations = prev.getConversations;

        if (oldConversations.some((u) => u.id === newConversation.id)) {
          return prev;
        }

        // Merge conversations
        const conversations = newConversation;
        delete conversations['receiverId'];
        const mergedConversations = [newConversation, ...oldConversations];

        return { getConversations: mergedConversations };
      },
    });

    return () => {
      unsubscribe();
    };
  }, [subscribeToMore]);



  return (
    <Box className={classes.main__chatUsersList}>
      <Box className={classes.chatlist__heading}>
        <Typography component={'span'} variant={'h3'} color="HighlightText">Chats</Typography>
        <IconButton size="small" className={classes.btnNobg}>
          <IconDots />
        </IconButton>
      </Box>
      <Box className={classes.chatList__search}>
        <Box className={classes.search_wrap}>
          <input type="text" placeholder="Search Here" required />
          <IconButton color="inherit" size="small" className={classes.searchBtn}>
            <IconSearch />
          </IconButton>
        </Box>
      </Box>
      <Box sx={{ paddingBlock: 1 }}>
        <Typography component={'span'} variant={'h4'} color="ButtonShadow">Recent</Typography>
      </Box>

      <Box className={classes.chatlist__items}>
        {!loading && data?.getConversations?.map((user, index) => {
          const unseen = !user.lastMessageSender && !user.seen;
          return (
            <ConversationItem
              unseen={unseen}
              user={user}
              key={user.id}
              animationDelay={index + 1}
              active={user.active ? "active" : ""}
              isOnline={user.isOnline ? "active" : ""}
            />
          );
        })}
      </Box>
    </Box>
  )

}
export default Conversation