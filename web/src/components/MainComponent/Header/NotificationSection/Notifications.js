import React from 'react'
import { List, Typography, useTheme } from '@mui/material';
import NotificationList from './NotificationList';
import { InfiniteScroll, Skeletons } from '../../../MainComponent';


const Notifications = ({ variables, data, loading, fetchMore, networkStatus, setLimit }) => {
  const theme = useTheme();
  if (loading && networkStatus === 1) return <Skeletons count={3} />
  if (!data?.getUserNotifications?.notifications?.length) return <Skeletons count={2} paddingTop={1} />


  const listStyle = {
    width: '100%',
    maxWidth: 350,
    minWidth: 300,
    py: 0,
    borderRadius: '10px',
    backgroundColor: theme.palette.background.paper,
    [theme.breakpoints.down('md')]: {
      minWidth: '100%',
      maxWidth: 330,
    },
    '& .MuiListItemSecondaryAction-root': {
      top: 25
    },
    '& .MuiDivider-root': {
      my: 0
    },
    '& .list-container': {
      pl: 7
    }
  }
  return (
    <List sx={listStyle}>
      <InfiniteScroll
        data={data?.getUserNotifications?.notifications}
        dataKey="getUserNotifications.notifications"
        count={parseInt(data?.getUserNotifications?.count)}
        variables={variables}
        fetchMore={fetchMore}
        setLimit={setLimit}
      >
        {(data) => {
          const showNextLoading = loading && networkStatus === 3 && data?.getUserNotifications?.count !== data?.length;
          return (
            <>
              <List>
                {data?.map((notification) => (
                  <NotificationList key={notification.id} notification={notification} close={() => false} />
                ))}
              </List>
              {showNextLoading && <Typography>Loading...</Typography>}
            </>
          );
        }}
      </InfiniteScroll>
    </List>
  );
};

export default Notifications;
