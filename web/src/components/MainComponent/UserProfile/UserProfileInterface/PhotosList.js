import React, { useState } from 'react';
import { Box, ImageList, ImageListItem, useTheme, useMediaQuery, Typography } from '@mui/material';

import { useQuery } from '@apollo/client';
import { PROFILE_PAGE_POSTS_LIMIT } from '../../../../constants';
import { GET_USER_POSTS } from '../../../../graphql';
import { EmptyPost, MakeDialogOpen } from '../../index';
import { useStyles } from './../styles';
import { PostDialog } from '../../Posts';

const PhotosList = ({ getUser }) => {
  const classes = useStyles()
  const theme = useTheme()
  const [postId, setPostId] = useState('')
  const matchDownSm = useMediaQuery(theme.breakpoints.down('sm'));
  const [isDialogOpen, setIsDialogOpen] = useState(false);


  const { data: { getUserPosts } = {}, loading } = useQuery(GET_USER_POSTS, { variables: { userId: getUser?.id, offset: 0, limit: PROFILE_PAGE_POSTS_LIMIT } })
  if (loading) return 'loading ....'
  if (!getUserPosts?.posts?.length) return <EmptyPost />

  const openDialogWithId = (id) => {
    setIsDialogOpen(true)
    setPostId(id)
  }
  return (
    <Box sx={{ background: '#fff' }}>
      <ImageList variant="masonry" cols={matchDownSm ? 2 : 3} >
        {getUserPosts?.posts?.map((post) => {
          return (
            <ImageListItem key={post.id} className={classes.imageList} onClick={() => openDialogWithId(post?.id)}>
              {
                post.image.length >= 1 ? (
                  <Box>
                    <img
                      style={{ width: '100%', height: '100%', borderRadius: 10 }}
                      src={post.image[0]}
                      alt='images.....'
                    />
                    {post.image.length > 1 && <Typography className={classes.imagePlus}>1+</Typography>}
                  </Box>
                ) : null
              }

            </ImageListItem>
          )
        })}
      </ImageList>
      <MakeDialogOpen open={isDialogOpen} close={() => setIsDialogOpen(false)} >
        <PostDialog postId={postId} />
      </MakeDialogOpen>
    </Box>
  )
}


export default PhotosList