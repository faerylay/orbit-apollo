import React from 'react'
import { List, Typography } from '@mui/material';
import NotificationList from './NotificationList';
import { InfiniteScroll, Skeletons } from '../../../MainComponent';
import { useStyles } from './styles';


const Notifications = ({ variables, data, loading, fetchMore, networkStatus, setLimit }) => {
  const classes = useStyles();
  if (loading && networkStatus === 1) return <Skeletons count={3} />
  if (!data?.getUserNotifications?.notifications?.length) return <Skeletons count={2} paddingTop={1} />
  return (
    <List className={classes.root}>
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
