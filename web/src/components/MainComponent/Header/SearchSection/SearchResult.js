import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Paper, Box, Typography, Avatar } from '@mui/material';
import { searchBox, searchResultList } from './styles';

const SearchResult = ({ data, loading }) => {
  const navigate = useNavigate()
  return (
    <Paper elevation={2} sx={searchBox}>
      {data?.length < 1 && (
        <Box>
          <Typography>No search results.</Typography>
        </Box>
      )}
      {loading && (
        <Typography>Loading...</Typography>
      )}
      {!loading && data?.map(data => {
        const link = data?.__typename === 'Post' ? 'single-post' : 'profile'
        return (
          <Box key={data.id} onClick={() => navigate(`${link}/${data.id}`)} sx={searchResultList}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex' }}>
                <Avatar sx={{ width: 33, height: 33 }} />
                <Typography variant="subtitle1" sx={{ alignSelf: 'center', pl: 1 }}>
                  {data?.fullName || data?.author?.fullName}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography variant="subtitle2" sx={{ alignSelf: 'center', border: .5, borderColor: '#999', p: .5, borderRadius: 1 }}>
                  {data?.__typename === 'Post' ? 'Post' : 'User'}
                </Typography>
              </Box>
            </Box>
          </Box>
        )
      })}
    </Paper>
  )
}

export default SearchResult