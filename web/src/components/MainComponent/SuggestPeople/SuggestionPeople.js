import React from 'react'
import { useQuery } from '@apollo/client'
import { Typography, Box, Card, Paper, CardContent } from '@mui/material'

import { USER_SUGGESTION, } from '../../../graphql'
import { CreateFollow } from '../Users'

const SuggestionPeople = () => {
  const { data: { suggestPeople } = {}, loading } = useQuery(USER_SUGGESTION)
  if (loading) return <Typography>loading ...</Typography>
  if (!suggestPeople?.length > 0) return null;

  return (
    <Card sx={{ mb: 1 }}>
      <CardContent>
        <Typography variant='h4' sx={{ mb: 1 }}>Suggest People</Typography>
        <Paper variant="outlined" sx={{ display: 'flex', flexWrap: 'wrap', overflow: 'scroll', justifyContent: 'flex-start', }} >
          {
            !loading && suggestPeople?.map(user => {
              return (
                <Box key={user.id} sx={{ p: 1, }}>
                  <Typography variant='body1' sx={{ pb: 1 }}>{user.fullName}</Typography>
                  <CreateFollow getUser={user} />
                </Box>
              )
            })
          }
        </Paper>
      </CardContent>
    </Card>
  )
}
export default SuggestionPeople