import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Box, Typography } from '@mui/material';
import { IconDots } from '@tabler/icons'
import { useMutation } from '@apollo/client';
import { useSelector } from 'react-redux'
import { FETCH_POSTS_QUERY, DELETE_POST } from '../../../graphql'
import PostUpdatedHistory from './PostUpdatedHistory';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

export default function PostMenu({ postId, userId, imagePublicId }) {

  const auth = useSelector(state => state?.users?.user)
  const navigate = useNavigate()

  const [deletePost] = useMutation(DELETE_POST, {
    onError(err) {
      console.log(err?.graphQLErrors[0].message)
    },
    variables: {
      input: { postId, imagePublicId }
    },
    refetchQueries: [
      { query: FETCH_POSTS_QUERY },
    ]
  })

  const deleting = (popupState) => {
    deletePost()
    navigate('/')
    popupState.close()
  }

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <>
          <IconButton {...bindTrigger(popupState)} >
            <IconDots />
          </IconButton>
          <Menu {...bindMenu(popupState)}>
            {
              auth?.id === userId && (
                <Box>
                  <MenuItem onClick={() => deleting(popupState)}>Delete</MenuItem>
                  <MenuItem >
                    <Link to={`/update-post/${postId}`} style={{ textDecoration: 'none', color: '#868686' }}>
                      <Typography >Update Post</Typography>
                    </Link>
                  </MenuItem>
                </Box>
              )
            }
            <MenuItem >
              <PostUpdatedHistory postId={postId} closeMenu={popupState} />
            </MenuItem>
            <MenuItem >
              <Typography>Save Post</Typography>
            </MenuItem>
            <MenuItem >
              <Typography>Report Post</Typography>
            </MenuItem>
            <MenuItem onClick={() => navigate(`/single-post/${postId}`)}>
              <Typography>Post Detail</Typography>
            </MenuItem>

          </Menu>
        </>
      )}
    </PopupState>
  );
}

