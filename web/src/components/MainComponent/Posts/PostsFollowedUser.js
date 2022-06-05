import React, { useState } from 'react';
import { Box } from '@mui/material';
import { useQuery } from '@apollo/client'
import { GET_FOLLOWED_POSTS } from '../../../graphql'
import { Skeletons, EmptyPost, InfiniteScroll } from '../../MainComponent'

import { PostCard } from './index'
import { useSelector } from 'react-redux';
import { HOME_PAGE_POSTS_LIMIT } from '../../../constants/DataLimit'


export default function PostsFollowedUser() {
  const [limit, setLimit] = useState(HOME_PAGE_POSTS_LIMIT);
  const auth = useSelector(state => state?.users?.user)
  const variables = { userId: auth?.id, offset: 0, limit };
  const { data, loading, fetchMore, networkStatus } = useQuery(GET_FOLLOWED_POSTS, {
    variables,
    notifyOnNetworkStatusChange: true,
  });
  const post = data?.getFollowedPosts;

  const renderContent = () => {
    if (loading && networkStatus === 1) return (
      <>
        <Skeletons count={3} cardHeader cardContent cardActions />
      </>
    )
    if (!post?.posts?.length) return <EmptyPost />

    return (
      <InfiniteScroll
        data={post?.posts}
        count={parseInt(post?.count)}
        variables={variables}
        fetchMore={fetchMore}
        setLimit={setLimit}
      >
        {(data) => {
          const showNextLoading = loading && networkStatus === 3 && post?.count !== data.length;
          return (
            <Box>
              <PostCard data={data} />
              {showNextLoading && <Skeletons count={2} cardHeader cardContent cardActions />}
            </Box>
          )
        }}
      </InfiniteScroll>
    )
  }

  return (
    <Box>
      {renderContent()}
    </Box>
  );
}
