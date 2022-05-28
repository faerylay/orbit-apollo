import React from 'react';
import moment from 'moment'
import { useQuery } from '@apollo/client'
import { IconMessageDots } from '@tabler/icons';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Grid, Box, Typography, Card, CardHeader, Avatar, IconButton, CardContent, CardActions } from '@mui/material';

import { FETCH_POST } from '../../graphql'
import { PostMenu, PostWhoLike, PostLike, CardMedias } from '../../components/MainComponent/Posts'
import { Comments, CommentCreate } from '../../components/MainComponent/Comments'

export default function SinglePost() {
  const navigate = useNavigate()
  const { postId } = useParams();
  const { data: { getPost } = {}, loading } = useQuery(FETCH_POST, {
    variables: { postId }
  })

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item md={2} sm={1} ></Grid>
        <Grid item md={8} sm={10} xs={12}>
          {
            loading ? (
              <h1>Loading...</h1>
            ) : (
              <Box>
                <Card sx={{ mb: 2 }}>
                  <CardHeader avatar={
                    <Avatar alt={getPost?.author?.fullName?.charAt(0).toUpperCase()} src={getPost?.author?.image} onClick={() => navigate(`/profile/${getPost?.author?.id}`)} aria-label="recipe" sx={{ width: 50, height: 50, cursor: 'pointer', border: 2, ":hover": { borderColor: 'dodgerblue' } }} />
                  }
                    action={
                      <PostMenu postId={getPost?.id} userId={getPost?.author?.id} imagePublicId={getPost?.imagePublicId} />
                    }
                    title={getPost?.author?.fullName}
                    subheader={moment.unix(getPost?.createdAt).fromNow()}
                  />
                  <CardMedias image={getPost?.image} />
                  <CardContent>
                    <Typography variant="h6" color="black">{getPost?.title}</Typography>
                    <Typography variant="body2" color="text.secondary"> {getPost?.description}</Typography>
                  </CardContent>
                  <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center' }}>
                      <PostLike postId={getPost?.id} author={getPost?.author} likes={getPost?.likes} />
                      <Typography>{getPost?.likeCount} .Like</Typography>
                      <PostWhoLike liked={getPost?.likes} />
                    </Box>
                    <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center' }} >
                      <IconButton aria-label="comment" ><IconMessageDots /></IconButton>
                      <Typography >{getPost?.commentCount} .Comment</Typography>
                    </Box>
                  </CardActions>
                  <CardContent>
                    <CommentCreate postId={getPost?.id} author={getPost?.author} />
                    <Comments getPost={getPost} />
                  </CardContent>
                </Card>
              </Box>
            )
          }
        </Grid>
      </Grid>
    </Container>
  );
}
