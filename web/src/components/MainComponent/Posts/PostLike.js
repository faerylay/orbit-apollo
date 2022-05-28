import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { IconButton } from '@mui/material';
import { IconThumbUp } from '@tabler/icons';
import { useMutation } from '@apollo/client'
import useNotifications from '../../../hooks/useNotifications'
import { NotificationType } from '../../../constants/NotificationType';
import { LIKE_POST, FETCH_POSTS_QUERY, FETCH_POST, GET_AUTH_USER, FETCH_USER, FETCH_ALL_USERS, GET_FOLLOWED_POSTS, GET_USER_POSTS } from '../../../graphql'
import { PROFILE_PAGE_POSTS_LIMIT, HOME_PAGE_POSTS_LIMIT } from '../../../constants/DataLimit'

export default function LikePost({ postId, author, likes }) {
  const theme = useTheme();
  const [loading, setLoading] = useState(false)
  const auth = useSelector(state => state?.users.user)
  const notification = useNotifications();

  const [likePost] = useMutation(LIKE_POST, {
    onError(err) {
      console.log(err?.graphQLErrors[0].message)
      window.location.reload(false)
    },
    variables: {
      input: {
        postId
      }
    },
    refetchQueries: () => [
      { query: GET_AUTH_USER },
      { query: FETCH_USER, variables: { getUserId: author?.id } },
      { query: FETCH_ALL_USERS },
      { query: GET_FOLLOWED_POSTS, variables: { userId: auth?.id, offset: 0, limit: HOME_PAGE_POSTS_LIMIT } },
      { query: GET_USER_POSTS, variables: { userId: author?.id, offset: 0, limit: PROFILE_PAGE_POSTS_LIMIT } },
      { query: FETCH_POSTS_QUERY },
      { query: FETCH_POST, variables: { postId } },
    ]
  })

  const authLiked = likes?.find(like => like?.user?.id === auth?.id)

  const hasLiked = likes?.find((l) => l?.user?.id === auth?.id && l?.post?.id === postId);

  const handleButtonClick = async () => {
    setLoading(true)
    const { data } = await likePost()

    if (auth?.id === author?.id) return setLoading(false)
    if (auth?.id !== author?.id) {
      await notification.toggle({
        user: author,
        postId,
        hasDone: hasLiked,
        notificationType: NotificationType.LIKE,
        notificationTypeId: data.createLike ? data.createLike.id : null,
      });
    }
    setLoading(false)
  }

  return (
    <IconButton sx={{ color: authLiked ? theme.palette.primary.main : theme.palette.grey[500] }} disabled={loading} aria-label="add to favorites" onClick={handleButtonClick} >
      <IconThumbUp />
    </IconButton>
  )
}
