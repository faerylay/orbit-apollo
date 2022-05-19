import React from 'react';
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Grid, Box, Typography, Paper } from '@mui/material';

import { FETCH_POST } from '../../graphql';
import { PostUpdating } from '../../components/MainComponent/Posts'

export default function PostUpdate() {
  const { postId } = useParams();
  const { data: { getPost } = {}, loading } = useQuery(FETCH_POST, {
    variables: { postId },
  })

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item sm={1} md={2} lg={3} />
          <Grid item xs={12} sm={10} md={8} lg={6} >
            <Paper sx={{ p: 2 }}>
              {
                loading ? (
                  <h1>Loading ... </h1>
                ) : (
                  <Box >
                    <Typography sx={{ mb: 2 }} variant="h3" component="div">Update Post</Typography>
                    <PostUpdating postId={getPost?.id} title={getPost?.title} description={getPost?.description} image={getPost?.image} imagePublicId={getPost?.imagePublicId} />
                  </Box>
                )
              }
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
