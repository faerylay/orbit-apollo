import React from 'react'
import moment from 'moment'
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardHeader, Avatar, IconButton, CardContent, CardActions } from '@mui/material';
import { IconMessageDots } from '@tabler/icons';
import { PostMenu, PostLike, CardMedias } from '.'

export default function PostCard({ data }) {
  const navigate = useNavigate()
  const renderContent = () => {
    return data && data.map(post => (
      <Card sx={{ mb: 2 }} key={post.id} >
        <CardHeader
          avatar={<Avatar alt={post.author.fullName?.charAt(0).toUpperCase()} src={post?.author?.image} onClick={() => navigate(`/profile/${post.author.id}`)} aria-label="recipe" sx={{ width: 44, height: 44, cursor: 'pointer', border: 2, ":hover": { borderColor: 'dodgerblue' } }} />}
          action={<PostMenu postId={post.id} userId={post.author.id} imagePublicId={post.imagePublicId} />}
          title={post.author.fullName}
          subheader={moment.unix(post.createdAt).fromNow()}
        />
        <CardMedias image={post?.image} />
        <CardContent>
          <Typography sx={{ cursor: 'pointer', ":hover": { color: 'dodgerblue' } }} onClick={() => navigate(`/single-post/${post.id}`)} variant="h6" color="black">{post.title}</Typography>
          <Typography variant="body2" color="text.secondary"> {post.description}</Typography>
        </CardContent>
        <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center' }}>
            <PostLike postId={post?.id} author={post?.author} likes={post?.likes} />
            <Typography>{post?.likeCount} .Like</Typography>
          </Box>
          <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center' }} onClick={() => navigate(`/single-post/${post.id}`)}>
            <IconButton aria-label="comment" ><IconMessageDots /></IconButton>
            <Typography >{post.commentCount} .Comment</Typography>
          </Box>
        </CardActions>
      </Card>
    ))
  }
  return (
    <Box>
      {renderContent()}
    </Box>
  )
}
