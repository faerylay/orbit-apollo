import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Box, Typography } from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { useMutation, useQuery } from '@apollo/client';
import { useSelector } from 'react-redux'
import { FETCH_POSTS_QUERY, DELETE_POST, POST_UPDATED_HISTORIES } from '../../../graphql'
import PostUpdatedHistory from './PostUpdatedHistory';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

export default function PostMenu({ postId, userId, imagePublicId }) {
  const auth = useSelector(state => state?.users?.user)
  const navigate = useNavigate()

  const [deletePost] = useMutation(DELETE_POST, {
    update(proxy) {
      navigate('/')
    },
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

  const { data, loading } = useQuery(POST_UPDATED_HISTORIES, { variables: { postId } })
  const deleting = (popupState) => {
    deletePost()
    popupState.close()
  }
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <>
          <IconButton {...bindTrigger(popupState)} >
            <MoreVert />
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
            {
              !loading && data.postupdatedhistorys.length !== 0 && (
                <MenuItem >
                  <PostUpdatedHistory data={data} closeMenu={popupState} />
                </MenuItem>
              )
            }
            <MenuItem >
              <Typography>Save Post</Typography>
            </MenuItem>
            <MenuItem >
              <Typography>Report Post</Typography>
            </MenuItem>

          </Menu>
        </>
      )}
    </PopupState>
  );
}

