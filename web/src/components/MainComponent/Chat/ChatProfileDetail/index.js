import React from 'react'
import { Box } from '@mui/material'
import ChatUserDetail from './ChatUserDetail'

const UserProfileDetail = ({ getUser }) => {
  return (
    <Box>
      <ChatUserDetail receiver={getUser} />
    </Box>
  )
}

export default UserProfileDetail