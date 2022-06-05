import React from 'react';
import { Grid } from '@mui/material';
import { PostsFollowedUser } from '../components/MainComponent/Posts'
import { SuggestionPeople } from '../components/MainComponent/SuggestPeople/';
import { Skeletons, NotFound } from '../components/MainComponent';

const Home = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7} lg={6} >
            <PostsFollowedUser />
          </Grid>
          <Grid item xs={12} md={5} lg={4}>
            <SuggestionPeople />
            <NotFound />
            <Skeletons count={2} cardHeader cardContent cardActions />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Home