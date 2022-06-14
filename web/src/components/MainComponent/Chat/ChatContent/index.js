import React, { useCallback, useEffect } from 'react'
import { Box, Skeleton } from '@mui/material';
import { useParams } from "react-router-dom";
import { useQuery, useApolloClient } from '@apollo/client';
import { useSelector } from 'react-redux'

import { GET_AUTH_USER, GET_MESSAGES, GET_CONVERSATIONS, UPDATE_MESSAGE_SEEN, GET_MESSAGES_SUBSCRIPTION, FETCH_USER } from '../../../../graphql'
import ChatContent from './ChatContent'


const ChatConversation = () => {
  const client = useApolloClient();
  const auth = useSelector(state => state?.users?.user)
  const { userId } = useParams();

  const { data: { getUser } = {}, loading } = useQuery(FETCH_USER, {
    variables: { getUserId: userId },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first"
  })
  const { subscribeToMore, data: messages, loading: messagesLoading } = useQuery(GET_MESSAGES, {
    variables: { authUserId: auth.id, userId },
    fetchPolicy: 'network-only',
  });

  const updateMessageSeen = useCallback(async () => {
    try {
      await client.mutate({
        mutation: UPDATE_MESSAGE_SEEN,
        variables: {
          input: {
            receiver: auth.id,
            sender: userId,
          },
        },
        refetchQueries: () => [
          {
            query: GET_CONVERSATIONS,
            variables: { authUserId: auth.id },
          },
          { query: GET_AUTH_USER },
        ],
      });
    } catch (err) { }
  }, [auth.id, client, userId]);

  useEffect(() => {
    if (userId) {
      const unsubscribe = subscribeToMore({
        document: GET_MESSAGES_SUBSCRIPTION,
        variables: { authUserId: auth.id, userId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;

          updateMessageSeen();

          const newMessage = subscriptionData.data.messageCreated;
          const mergedMessages = [...prev.getMessages, newMessage];

          return { getMessages: mergedMessages };
        },
      });
      return () => {
        unsubscribe();
      };
    }
  }, [auth.id, userId, subscribeToMore, updateMessageSeen]);

  useEffect(() => {
    if (userId) {
      updateMessageSeen();
    }
  }, [userId, updateMessageSeen]);

  if (loading || messagesLoading) {
    return (
      <Box sx={{ width: '100%', height: '100%' }}>
        <Skeleton animation="pulse" variant="text" width={'100%'} height={'15%'} />
        <Skeleton animation="pulse" variant="rectangular" width={'100%'} height={'70%'} />
        <Skeleton animation="pulse" variant="text" width={'100%'} height={'15%'} />
      </Box>
    );
  }
  return (
    <ChatContent
      sender={auth}
      receiver={getUser}
      messages={messages ? messages.getMessages : []}
    />
  )
}

export default ChatConversation