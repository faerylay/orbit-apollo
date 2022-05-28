import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Outlet } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useTheme } from '@mui/material/styles';
import { AppBar, Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';

import Header from './Header';
import Sidebar from './Sidebar';
import { NOTIFICATION_CREATED_OR_DELETED, GET_AUTH_USER, GET_NEW_CONVERSATIONS_SUBSCRIPTION } from '../../graphql'
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

  const { loading, subscribeToMore, data, error } = useQuery(GET_AUTH_USER);

  useEffect(() => {
    if (!loading) {
      dispatch(addUser(data?.getAuthUser))
    }
    dispatch(SET_MENU(!matchDownMd))
  }, [dispatch, loading, data, matchDownMd])


  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: NOTIFICATION_CREATED_OR_DELETED,
      updateQuery: async (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const oldNotifications = prev.getAuthUser.newNotifications;
        const { operation, notification } = subscriptionData.data.notificationCreatedOrDeleted;
        let newNotifications = [];

        if (operation === 'CREATE') {
          // Don't show message notification in Header if user already is on notifications page
          if (window.location.href.split('/')[3] === 'notifications') {
            return prev;
          }

          // Add new notification
          newNotifications = [notification, ...oldNotifications];
        } else {
          // Remove from notifications
          const notifications = oldNotifications;
          const index = notifications.findIndex((n) => n.id === notification.id);
          if (index > -1) {
            notifications.splice(index, 1);
          }

          newNotifications = notifications;
        }
        // Attach new notifications to authUser
        const authUser = Object.assign({}, prev.getAuthUser, {
          newNotifications: newNotifications
        })
        return { getAuthUser: authUser }
      },
    });

    return () => {
      unsubscribe();
    };
  }, [subscribeToMore]);

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: GET_NEW_CONVERSATIONS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const oldConversations = prev.getAuthUser.newConversations;
        const { newConversation } = subscriptionData.data;

        // Don't show message notification in Header if user already is on messages page
        if (window.location.href.split('/')[3] === 'messages') {
          return prev;
        }

        // If authUser already has unseen message from that user,
        // remove old message, so we can show the new one
        const index = oldConversations.findIndex((u) => u.id === newConversation.id);
        if (index > -1) {
          oldConversations.splice(index, 1);
        }

        // Merge conversations
        const mergeConversations = [newConversation, ...oldConversations];

        // Attach new conversation to authUser
        // const authUser = prev.getAuthUser;
        // authUser.newConversations = mergeConversations;

        const authUser = Object.assign({}, prev.getAuthUser, {
          newConversations: mergeConversations
        })
        return { getAuthUser: authUser }
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
          <Header handleLeftDrawerToggle={handleLeftDrawerToggle} auth={data?.getAuthUser} />
        </Toolbar>
      </AppBar>
      {
        !location.pathname.includes('/chat') && (
          <Sidebar drawerOpen={leftDrawerOpened} drawerToggle={handleLeftDrawerToggle} />
        )
      }
      <Main theme={theme} open={leftDrawerOpened} location={location}>
        <Outlet />
      </Main>
    </Box>
  );
};

export default MainComponent;
