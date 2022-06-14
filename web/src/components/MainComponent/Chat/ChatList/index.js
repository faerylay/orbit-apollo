import React from 'react';
import { Box, Tabs, Tab, useTheme, useMediaQuery } from '@mui/material';
import { IconBrandHipchat, IconUsers } from '@tabler/icons'
import { useSelector } from 'react-redux';
import { TabPanel, a11yProps } from './Tabs';
import { UsersList } from './UserList'
import { Conversation } from './Conversation'
import { ConversationDrawer } from '../ChatDrawer';

const ChatUser = () => {
  const auth = useSelector(state => state?.users?.user);
  const chat = useSelector(state => state.chat)
  const theme = useTheme()
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const orient = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box sx={{ display: 'block' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column-reverse' }}>
        <Tabs
          centered
          onChange={handleChange}
          TabIndicatorProps={{ style: { display: "none" } }}
          indicatorColor="secondary"
          value={value}
          orientation={'horizontal'}
        >
          <Tab sx={{ marginLeft: -2 }} icon={<IconBrandHipchat />}  {...a11yProps(0)} />
          <Tab sx={{ marginLeft: -2 }} icon={<IconUsers />} {...a11yProps(1)} />
        </Tabs>

        <TabPanel value={value} index={0}>
          <Conversation orient={orient} auth={auth} />
        </TabPanel>

        <TabPanel value={value} index={1}>
          <UsersList orient={orient} auth={auth} />
        </TabPanel>
      </Box>
      <ConversationDrawer drawerOpen={chat.conversationOpened} />
    </Box>
  )
}
export default ChatUser