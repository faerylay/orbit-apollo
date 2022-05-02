import React, { useState } from 'react'
import { Box } from '@mui/material';
import { useQuery } from '@apollo/client'
import { GET_USER_POSTS } from '../../../graphql'
import { PROFILE_PAGE_POSTS_LIMIT } from '../../../constants/DataLimit'

import { InfiniteScroll, EmptyPost, Skeletons } from '../../MainComponent'
import PostCard from './PostCard';


const PostsByUser = ({ getUser }) => {
  const [limit, setLimit] = useState(PROFILE_PAGE_POSTS_LIMIT);
  const variables = { userId: getUser?.id, offset: 0, limit }
  const { data, loading, fetchMore, networkStatus } = useQuery(GET_USER_POSTS, {
    variables,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-only',
  })
  const post = data?.getUserPosts;

  if (loading && networkStatus === 1) return <Skeletons count={2} cardContent cardActions />
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
            {showNextLoading && <Skeletons count={2} cardContent cardActions />}
          </Box>
        )
      }}
    </InfiniteScroll>
  )
}


export default PostsByUser