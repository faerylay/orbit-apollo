import React from 'react'
import { IconButton, Typography } from '@mui/material';

// import { UPDATE_COMMENT } from '../utils'
// import { useMutation } from '@apollo/client'

export default function CommentUpdate({ post, commentId, setAnchorEl }) {

  // const [updateComment] = useMutation(UPDATE_COMMENT, {
  //   onError(err) {
  //     console.log(err.graphQLErrors[0].message)
  //   },
  //   variables: {
  //     postId: post.id,
  //     commentId,
  //   }
  // })

  const updateCmt = async () => {
    setAnchorEl(null);
    // await updateComment()
  }
  return (
    <IconButton onClick={updateCmt}>
      <Typography variant='body1'> Update</Typography>
    </IconButton>
  )
}
