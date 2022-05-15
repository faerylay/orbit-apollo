import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Outlet } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';

import Header from './Header';
import Sidebar from './Sidebar';
import Chat from './Chat';
import { NOTIFICATION_CREATED_OR_DELETED, ME } from '../../graphql'
import { SET_MENU, addUser } from '../../redux';
import { Main } from './mainStyle'
import NotFound from './Helpers/NotFound';

const MainComponent = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));

  // Handle left drawer
  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  const handleLeftDrawerToggle = () => {
    dispatch(SET_MENU(!leftDrawerOpened));
  };

  const { loading, subscribeToMore, data, error } = useQuery(ME);

  useEffect(() => {
    if (!loading) {
      dispatch(addUser(data?.me))
    }
    dispatch(SET_MENU(!matchDownMd))
  }, [dispatch, loading, data, matchDownMd])

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: NOTIFICATION_CREATED_OR_DELETED,
      updateQuery: async (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const oldNotifications = prev.me.newNotifications;
        const { operation, notification } = subscriptionData.data.notificationCreatedOrDeleted;

        let newNotifications;

        if (operation === 'CREATE') {
          newNotifications = [notification, ...oldNotifications];
        } else {
          const notifications = oldNotifications;
          const index = notifications.findIndex((n) => n.id === notification.id);
          if (index > -1) {
            notifications.splice(index, 1);
          }
          newNotifications = notifications;
        }
        Object.assign({}, prev.me, {
          newNotifications: newNotifications
        })
        return prev.me
      },
    });

    return () => {
      unsubscribe();
    };
  }, [subscribeToMore]);

  let location = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location]);
  if (loading) return 'loading...';
  if (error) {
    const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
    let devErrorMessage, prodErrorMessage;
    if (isDevelopment) {
      devErrorMessage = 'Sorry, something went wrong. Please open the browser console to view the detailed error message.';
      console.log(error?.graphQLErrors[0]?.message)
    }

    prodErrorMessage = "Sorry, something went wrong. We're working on getting this fixed as soon as we can.";
    return <NotFound message={isDevelopment ? devErrorMessage : prodErrorMessage} showHomePageLink={'/login'} />;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: leftDrawerOpened ? theme.transitions.create('width') : 'none',
        }}
      >
        <Toolbar variant='dense' sx={{ py: 1 }}>
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
        </Toolbar>
      </AppBar>

      <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />
      <Main theme={theme} open={leftDrawerOpened}>
        <Outlet />
      </Main>
      <Chat />
    </Box>
  );
};

export default MainComponent;
