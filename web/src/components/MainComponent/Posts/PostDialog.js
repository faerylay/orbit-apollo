import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Box, Avatar, Typography, IconButton, Divider, useTheme, useMediaQuery } from '@mui/material';
import { useQuery } from '@apollo/client';
import { IconBookmarks } from '@tabler/icons'
import { useStyles } from './styles';
import { FETCH_POST } from '../../../graphql';
import { CommentCreate, Comments } from '../Comments';
import { PostLike, PostWhoLike, PostMenu } from '.';



const PostDialog = ({ postId }) => {
  const theme = useTheme()
  const matchSm = useMediaQuery(theme.breakpoints.down('sm'))
  const heightCarousel = matchSm ? 'calc(100vh - calc(100vh /2))' : 'calc(100vh - calc(100vh /12))'
  const classes = useStyles()
  const { data: { getPost } = {}, loading } = useQuery(FETCH_POST, {
    variables: { postId }
  })

  const renderImages = () => {
    return getPost?.image ? (
      <Carousel
        navButtonsAlwaysVisible={getPost.image.length > 1}
        navButtonsAlwaysInvisible={getPost.image.length === 1}
        indicators={false} swipe={false} slide={true} autoPlay={false}
        height={heightCarousel}
      >
        {getPost.image.map(image => (
          <img
            key={image}
            src={image}
            className={classes.renderImages}
            alt='images...'
            accept='image/x-png,image/jpeg'
          />
        ))}
      </Carousel>
    ) : (
      <Avatar />
    );
  }
  return (
    <Box className={classes.dialogBox} >
      <Box className={classes.postDialogImage}>
        {loading && <Avatar />}
        {!loading && renderImages()}
      </Box>
      <Box className={classes.postDialogDetail}>
        <Box className={classes.postDialogHeader}>
          <Box className={classes.postDialogHeaderPersonal}>
            <img src={getPost?.author?.image} alt="images...." />
            <Typography variant='h3' component='p'>{getPost?.author?.fullName}</Typography>
          </Box>
          <Box className={classes.postDialogHeaderMenu}>
            <PostMenu postId={getPost?.id} userId={getPost?.author?.id} imagePublicId={getPost?.imagePublicId} />
          </Box>
        </Box>
        <Divider />
        <Box className={classes.postDialogBody}>
          <Box sx={{ paddingInline: 3, paddingBlock: 2 }}>
            <Typography variant='h4'>{getPost?.title}</Typography>
            <Typography variant='subtitle1'>{getPost?.description}</Typography>
          </Box>
          <Divider />
          <Box sx={{ height: 30, width: '100%', display: 'flex', justifyContent: 'space-around' }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PostLike postId={getPost?.id} author={getPost?.author} likes={getPost?.likes} likeCount={getPost?.likeCount} />
              {
                Boolean(getPost?.likes.length) && <PostWhoLike liked={getPost?.likes} />
              }

            </Box>
            <Box className={classes.displayFlex} >
              <Typography>{getPost?.commentCount}</Typography>
              <Typography sx={{ paddingLeft: 1 }}>Comments</Typography>
            </Box>
            <IconButton disableRipple >
              <IconBookmarks />
            </IconButton>
          </Box>
          <Divider />
          <Box sx={{ padding: 1 }}>
            <Box className={classes.postDialogFooter}>
              <CommentCreate postId={getPost?.id} author={getPost?.author} />
            </Box>
            <Comments getPost={getPost} />
          </Box>
        </Box>

      </Box>
    </Box>
  )
}

export default PostDialog