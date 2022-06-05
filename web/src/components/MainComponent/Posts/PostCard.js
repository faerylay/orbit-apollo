import React, { useState } from 'react';
import moment from 'moment';
import Carousel from 'react-material-ui-carousel'
import { useNavigate } from 'react-router-dom';
import { Box, Avatar, Card, CardMedia, CardContent, CardActions, Typography, Button } from '@mui/material';
import { IconMessageCircle, IconBookmark } from '@tabler/icons';

import { PostLike, PostMenu, PostDialog } from './index';
import { MakeDialogOpen } from '../index';

const PostCard = ({ data }) => {
  const navigate = useNavigate()
  const [postId, setPostId] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // const openDialogWithId = (id) => {
  //   setIsDialogOpen(true)
  //   setPostId(id)
  // }
  const renderContent = () => {
    return data && data.map(post => (
      <Card sx={{ mt: 1, mb: 2 }} key={post.id}>
        <Box sx={{ width: '100%', padding: 1.5, background: '#fff', alignItems: 'center', display: 'flex', justifyContent: 'space-between', paddingInline: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar alt={post.author.fullName?.charAt(0).toUpperCase()} src={post?.author?.image} onClick={() => navigate(`/profile/${post.author.id}`)} aria-label="recipe" sx={{ cursor: 'pointer', border: 2 }} />
            <Box sx={{ paddingLeft: 1 }}>
              <Typography variant='h4'>{post.author.fullName}</Typography>
              <Typography variant='subtitle2'>{moment.unix(post.createdAt).fromNow()}</Typography>
            </Box>
          </Box>
          <PostMenu postId={post.id} userId={post.author.id} imagePublicId={post.imagePublicId} />
        </Box>
        <Carousel
          activeIndicatorIconButtonProps={{
            style: { color: 'dodgerblue' }
          }}
          navButtonsAlwaysInvisible={post.image.length === 1}
          indicators={post?.image.length > 1} swipe={true} slide={true} autoPlay={false}
        >
          {
            post?.image?.map(img => (
              <Box sx={{ background: '#000' }} key={img}>
                <CardMedia
                  component="img"
                  alt="images..."
                  sx={{
                    width: 'auto',
                    maxWidth: '100%',
                    minHeight: 500,
                    maxHeight: 700,
                    margin: 'auto',
                  }}
                  image={img}
                />
              </Box>
            ))
          }
        </Carousel>

        <Box sx={{ background: '#fff' }}>
          <CardContent  >
            <Typography sx={{
              cursor: 'pointer',
              ":hover": { color: 'dodgerblue' }
            }}
              onClick={() => {
                if (post?.image.length > 0) {
                  setIsDialogOpen(true)
                  setPostId(post?.id)
                }
                return
              }}
              variant="h5"
              color="black"
              gutterBottom
              component="div"
            >
              {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" >
              {post.description}
            </Typography>
          </CardContent>
          <CardActions sx={{ height: 48, display: 'flex', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <PostLike postId={post?.id} author={post?.author} likes={post?.likes} />
                <Typography variant='subtitle2'>{post?.likeCount}.Like</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Button aria-label="comment"  ><IconMessageCircle color='#999' /></Button>
                <Typography variant='subtitle2' >{post.commentCount}.Comment</Typography>
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