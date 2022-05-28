import { useState, useRef, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Stack, List, ClickAwayListener, Divider, Paper, Popper, Typography, Badge } from '@mui/material';
import { IconBrandMessenger, IconSearch, IconUserPlus } from '@tabler/icons';
import { useQuery } from '@apollo/client';
import { GET_NEW_CONVERSATIONS_SUBSCRIPTION, GET_CONVERSATIONS } from '../../../../graphql'
import MainCard from '../../Helpers/cards/MainCard';
import { Transitions } from '../../';
import ConversationItem from './ConversationItem';
import { useStyles } from './styles';

const ChatSection = ({ auth }) => {

  const classes = useStyles()
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const anchorRef = useRef(null);
  const prevOpen = useRef(open);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen)
  }
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) return;
    setOpen(false);
  };

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const { subscribeToMore, data, loading } = useQuery(GET_CONVERSATIONS, {
    variables: { authUserId: auth?.id },
  });

  useEffect(() => {
    const unsubscribe = subscribeToMore({
      document: GET_NEW_CONVERSATIONS_SUBSCRIPTION,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;

        const { newConversation } = subscriptionData.data;
        const oldConversations = prev.getConversations;

        if (oldConversations.some((u) => u.id === newConversation.id)) {
          return prev;
        }

        // Merge conversations
        const conversations = newConversation;
        delete conversations['receiverId'];
        const mergedConversations = [newConversation, ...oldConversations];

        return { getConversations: mergedConversations };
      },
    });

    return () => {
      unsubscribe();
    };
  }, [subscribeToMore]);

  return (
    <>
      <Box sx={{ ml: 0, mr: 3, [theme.breakpoints.down('md')]: { mr: 2 } }} >
        <ButtonBase sx={{ borderRadius: '12px' }}>
          <Avatar
            variant="rounded"
            className={classes.buttonBaseStyle}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            color="inherit"
          >
            <Badge badgeContent={auth?.newConversations?.length} color="secondary" >
              <IconBrandMessenger stroke={1.5} size="1.3rem" />
            </Badge>
          </Avatar>
        </ButtonBase>
      </Box>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{ modifiers: [{ name: 'offset', options: { offset: [0, 20] } }] }} >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <Box sx={{ p: 1.5, height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: 1 }}>
                      <Stack>
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Typography variant="h3" sx={{ pt: 1 }}>Chats</Typography>
                        </Stack>
                      </Stack>
                      <Stack>
                        <Stack direction="row" spacing={0.5} alignItems="center" >
                          <ButtonBase sx={{ mr: 1 }}>
                            <Avatar
                              variant="rounded"
                              className={classes.buttonBaseStyle}
                              aria-haspopup="true"
                              color="inherit"
                            >
                              <IconSearch stroke={1.5} size="1.3rem" />
                            </Avatar>
                          </ButtonBase>
                          <ButtonBase >
                            <Avatar
                              variant="rounded"
                              className={classes.buttonBaseStyle}
                              aria-haspopup="true"
                              color="inherit"
                            >
                              <IconUserPlus stroke={1.5} size="1.3rem" />
                            </Avatar>
                          </ButtonBase>
                        </Stack>
                      </Stack>
                    </Box>
                    <Divider />
                    <List component="nav" className={classes.listStyle}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography></Typography>
                        <a href='/chat'>Chat All</a>
                      </Box>
                      {!loading && data?.getConversations?.map((user, index) => {
                        const unseen = !user.lastMessageSender && !user.seen;
                        return (
                          <ConversationItem
                            unseen={unseen}
                            user={user}
                            key={user.id}
                            // animationDelay={index + 1}
                            active={user.active ? "active" : ""}
                            isOnline={user.isOnline ? "active" : ""}
                          />
                        );
                      })}
                    </List>
                  </Box>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ChatSection;
