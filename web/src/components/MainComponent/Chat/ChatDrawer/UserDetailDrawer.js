import React from 'react'
import { Drawer } from '@mui/material';
import ChatUserDetail from '../ChatProfileDetail/ChatUserDetail';


const UserDetailDrawer = ({ drawerOpen, getUser }) => (
  <Drawer
    anchor="right"
    open={drawerOpen}
    color="inherit"
    variant="persistent"
    sx={{
      width: '100%',
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: '100%',
        boxSizing: 'border-box',
      },
    }}
  >
    <ChatUserDetail receiver={getUser} />
  </Drawer>
);

export default UserDetailDrawer;
