import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client'
import { useTheme } from '@mui/material/styles';
import { Typography, IconButton } from '@mui/material';

import { CREATE_COMMENT_LIKES, FETCH_POST, GET_AUTH_USER } from '../../../graphql'
import useNotifications from '../../../hooks/useNotifications';
import { NotificationType } from '../../../constants';

const CommentLike = ({ comment, author, postId }) => {
  const theme = useTheme();
  const auth = useSelector(state => state?.users?.user)
  const [loading, setLoading] = useState(false)
  const notification = useNotifications()
  const [likeComment] = useMutation(CREATE_COMMENT_LIKES, {
    variables: {
      input: {
        commentId: comment?.id,
      }
    },
    refetchQueries: () => [
      { query: GET_AUTH_USER },
      { query: FETCH_POST, variables: { postId } },
    ]
  })

  const authCommentLiked = comment?.commentlikes?.find(like => like?.user?.id === auth?.id)
  const hasLiked = comment?.commentlikes?.find((l) => l?.user?.id === auth?.id && l.comment.id === comment.id);

  const handleButtonClick = async () => {
    setLoading(true)
    const { data } = await likeComment()

    if (auth?.id === author?.id) return setLoading(false)
    if (auth?.id !== author?.id) {
      await notification.toggle({
        user: author,
        postId,
        commentId: comment?.id,
        hasDone: hasLiked,
        notificationType: NotificationType.COMMENTLIKES,
        notificationTypeId: data.createCommentLikes ? data.createCommentLikes.id : null,
      });
    }
    setLoading(false)
  }
  return (
    <IconButton onClick={handleButtonClick}>
      <Typography variant='subtitle2' sx={{ color: authCommentLiked ? theme.palette.primary.main : theme.palette.grey[500] }} disabled={loading} >Like</Typography>
    </IconButton>
  )
}
export default CommentLike