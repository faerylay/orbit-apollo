import React from 'react'
import { Box, Tabs, Tab, } from '@mui/material';
import PhotosList from './PhotosList';
import { PostsByUser } from '../../Posts';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
export default function TabComponent({ getUser }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`}  {...other} >
        {value === index && (<Box> {children} </Box>)}
      </div>
    );
  }

  return (
    <Box sx={{ width: '100%', background: '#f5f5f5' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', background: '#fff' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Posts" {...a11yProps(0)} />
          <Tab label="Photos" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0} >
        <Box sx={{ mt: 1 }}>
          <PostsByUser getUser={getUser} />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <PhotosList getUser={getUser} />
      </TabPanel>
    </Box>
  )
}
