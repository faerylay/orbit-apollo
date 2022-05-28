import React from 'react';
import { Box, Tabs, Tab, useTheme, useMediaQuery } from '@mui/material';
import { IconBrandHipchat, IconUsers } from '@tabler/icons'
import { useSelector } from 'react-redux';
import { TabPanel, a11yProps } from './Tabs';
import { UsersList } from './UserList'
import { Conversation } from './Conversation'

const ChatUser = () => {
  const auth = useSelector(state => state?.users?.user);
  const theme = useTheme()
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const orient = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <Box sx={{ display: 'flex', flexDirection: orient ? 'column-reverse' : 'row' }}>
      <Tabs centered sx={{ width: orient ? '100%' : '20%', height: '100%', alignSelf: 'center' }} onChange={handleChange} TabIndicatorProps={{ style: { display: "none" }, }} indicatorColor="secondary" value={value} orientation={orient ? 'horizontal' : 'vertical'} >
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
  )
}
export default ChatUser