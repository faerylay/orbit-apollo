import React, { useState } from 'react';
import moment from 'moment';
import Carousel from 'react-material-ui-carousel'
import { useNavigate } from 'react-router-dom';
import { Box, Avatar, Card, CardMedia, CardContent, CardActions, Typography, Button } from '@mui/material';
import { IconBookmark } from '@tabler/icons';

import { PostLike, PostMenu, PostDialog } from './index';
import { MakeDialogOpen } from '../index';
import { useStyles } from './styles';

const PostCard = ({ data }) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const [postId, setPostId] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const imageExist = (post) => {
    if (post?.image.length > 0) {
      setIsDialogOpen(true)
      setPostId(post?.id)
      return
    }
    return navigate(`/single-post/${post?.id}`)
  }
  const renderContent = () => {
    return data && data.map(post => (
      <Card sx={{ mb: 2 }} key={post.id}>
        <Box className={classes.postCardMain}>
          <Box className={classes.postCardHeader}>
            <Avatar
              alt={post.author.fullName?.charAt(0).toUpperCase()}
              src={post?.author?.image}
              onClick={() => navigate(`/profile/${post.author.id}`)} aria-label="recipe"
              sx={{ cursor: 'pointer', border: 2 }}
            />
            <Box sx={{ paddingLeft: 1 }}>
              <Typography variant='h4'>{post.author.fullName}</Typography>
              <Typography variant='subtitle2'>{moment.unix(post.createdAt).fromNow()}</Typography>
            </Box>
          </Box>
          <PostMenu postId={post.id} userId={post.author.id} imagePublicId={post.imagePublicId} />
        </Box>
        <Carousel
          activeIndicatorIconButtonProps={{ style: { color: 'dodgerblue' } }}
          navButtonsAlwaysInvisible={post.image.length === 1}
          indicators={post?.image.length > 1} swipe={true} slide={true} autoPlay={false}
        >
          {
            post?.image?.map(img => (
              <Box key={img}>
                <CardMedia component="img" alt="images..." image={img}
                  className={classes.postCardImage}
                />
              </Box>
            ))
          }
        </Carousel>

        <Box sx={{ background: '#fff' }}>
          <CardContent  >
            <Typography className={classes.postImageExist}
              onClick={() => imageExist(post)} variant="h5" component="div"   >
              {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" >
              {post.description}
            </Typography>
          </CardContent>
          <CardActions sx={{ height: 48, display: 'flex', justifyContent: 'space-between' }}>
            <Box className={classes.displayFlex} >
              <Box sx={{ mr: { xs: 1, sm: 3, md: 4 } }}>
                <PostLike postId={post?.id} author={post?.author} likes={post?.likes} likeCount={post?.likeCount} />
              </Box>
              <Box className={classes.displayFlex}>
                <Typography variant='body1' >{post.commentCount} . Comment</Typography>
              </Box>
            </Box>
            <Button size="small">
              <IconBookmark color='#999' />
            </Button>
          </CardActions>
        </Box>
      </Card>
    ))
  }

  return (
    <Box>
      {renderContent()}
      <MakeDialogOpen open={isDialogOpen} close={() => setIsDialogOpen(false)} >
        <PostDialog postId={postId} />
      </MakeDialogOpen>
    </Box>
  )
}

export default PostCard