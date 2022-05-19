import React from 'react'
import { IconButton, Typography } from '@mui/material';
import { useMutation } from '@apollo/client'
import { useSelector } from 'react-redux';
import useNotifications from '../../../hooks/useNotifications'
import { DELETE_COMMENT, FETCH_POSTS_QUERY, ME } from '../../../graphql'


export default function CommentDelete({ post, commentId, imagePublicId }) {
  const auth = useSelector(state => state?.users?.user)
  const notification = useNotifications()
  const [deleteComment, { loading }] = useMutation(DELETE_COMMENT, {
    onError(err) {
      console.log(err?.graphQLErrors[0].message)
    },
    variables: {
      input: {
        postId: post.id,
        commentId,
        imagePublicId
      }
    },
    refetchQueries: [
      { query: FETCH_POSTS_QUERY },
      { query: ME },
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
  if (loading) return 'loading ...'

  return (
    <IconButton onClick={deleteCmt}>
      <Typography variant='body1'> Delete</Typography>
    </IconButton>
  )
}
