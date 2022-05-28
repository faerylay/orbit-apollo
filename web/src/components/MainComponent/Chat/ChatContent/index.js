import React, { useCallback, useEffect } from 'react'
import { Skeleton } from '@mui/material';
import { useParams } from "react-router-dom";
import { useQuery, useApolloClient } from '@apollo/client';


import { GET_AUTH_USER, GET_MESSAGES, GET_CONVERSATIONS, UPDATE_MESSAGE_SEEN, GET_MESSAGES_SUBSCRIPTION } from '../../../../graphql'
import ChatContent from './ChatContent'


const ChatConversation = ({ auth, getUser, loading }) => {
  const client = useApolloClient();
  const { userId } = useParams();



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
      <Skeleton />
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