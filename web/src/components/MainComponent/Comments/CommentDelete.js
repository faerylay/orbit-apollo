import React from 'react'
import { IconButton, Typography } from '@mui/material';
import { useMutation } from '@apollo/client'
import { useSelector } from 'react-redux';
import useNotifications from '../../../hooks/useNotifications'
import { DELETE_COMMENT, FETCH_POSTS_QUERY, GET_AUTH_USER } from '../../../graphql'
import ErrorOccur from './CommentHelper/ErrorOccur';


export default function CommentDelete({ post, commentId, imagePublicId }) {
  const auth = useSelector(state => state?.users?.user)
  const notification = useNotifications()
  const [deleteComment, { error }] = useMutation(DELETE_COMMENT, {
    variables: {
      input: {
        postId: post.id,
        commentId,
        imagePublicId
      }
    },
    refetchQueries: [
      { query: FETCH_POSTS_QUERY },
      { query: GET_AUTH_USER },
    ]
  })

  const deleteCmt = async () => {
    await deleteComment()
    if (auth?.id !== post?.author?.id) {
      const isNotified = post?.author?.notifications.find((n) => n.comment && n.comment.id === commentId);
      notification.remove({
        notificationId: isNotified?.id,
      });
    }
  }
  if (error) return <ErrorOccur />
  return (
    <IconButton onClick={deleteCmt}>
      <Typography variant='body1'> Delete</Typography>
    </IconButton>
  )
}
