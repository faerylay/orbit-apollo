import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, Button, ButtonBase, CardActions, Chip, ClickAwayListener, Divider, Grid, Paper, Popper, Stack, TextField, Typography, useMediaQuery, Badge } from '@mui/material';
import { useSelector } from 'react-redux';
import { IconBell } from '@tabler/icons';
import { useLazyQuery } from '@apollo/client';

import MainCard from '../../Helpers/cards/MainCard';
import { Transitions } from '../../../MainComponent';

import { GET_USER_NOTIFICATION } from '../../../../graphql'
import { NOTI_PAGE_NOTIFICATION_LIMIT } from '../../../../constants'
import Notifications from './Notifications';
import { status } from './utils';

const NotificationSection = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [limit, setLimit] = useState(NOTI_PAGE_NOTIFICATION_LIMIT);
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
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
  const handleChange = (event) => {
    if (event?.target.value) setValue(event?.target.value);
  };

  const auth = useSelector(state => state?.users?.user)
  const variables = {
    userId: auth?.id,
    offset: 0,
    limit,
  };
  const [getNoti, { data, loading, fetchMore, networkStatus }] = useLazyQuery(GET_USER_NOTIFICATION, {
    variables,
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (auth?.id) {
      getNoti();
    }
  }, [getNoti, auth]);

  return (
    <>
      <Box
        sx={{
          ml: 2,
          mr: 3,
          [theme.breakpoints.down('md')]: {
            mr: 2
          }
        }}
      >
        <ButtonBase sx={{ borderRadius: '12px' }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              '&[aria-controls="menu-list-grow"],&:hover': {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light
              },
              overflow: 'visible'
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            color="inherit"
          >
            <Badge badgeContent={data?.getUserNotifications?.count} color="secondary" >
              <IconBell stroke={1.5} size="1.3rem" />
            </Badge>
          </Avatar>
        </ButtonBase>
      </Box>
      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? 5 : 0, 20]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
            <Paper >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item xs={12}>
                      <Grid container alignItems="center" justifyContent="space-between" sx={{ pt: 2, px: 2 }}>
                        <Grid item>
                          <Stack direction="row" spacing={2}>
                            <Typography variant="subtitle1">All Notification</Typography>
                            <Chip
                              size="small"
                              label="01"
                              sx={{
                                color: theme.palette.background.default,
                                bgcolor: theme.palette.warning.dark
                              }}
                            />
                          </Stack>
                        </Grid>
                        <Grid item>
                          <Typography component={Link} to="#" variant="subtitle2" color="primary">
                            Mark as all read
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} >
                      <Box sx={{ py: 2, px: 1, height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden', }}>
                        <Grid container direction="column" spacing={2}>
                          <Grid item xs={12}>
                            <Box sx={{ px: 2, pt: 0.25 }}>
                              <TextField
                                id="outlined-select-currency-native"
                                select
                                fullWidth
                                value={value}
                                onChange={handleChange}
                                SelectProps={{
                                  native: true
                                }}
                              >
                                {status.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </TextField>
                            </Box>
                          </Grid>
                          <Grid item xs={12} p={0}>
                            <Divider sx={{ my: 0 }} />
                          </Grid>
                        </Grid>
                        {/* notification */}
                        <Notifications variables={variables} data={data} loading={loading} fetchMore={fetchMore} networkStatus={networkStatus} setLimit={setLimit} />
                      </Box>
                    </Grid>
                  </Grid>
                  <Divider />
                  <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                    <Button size="small" disableElevation>
                      View All
                    </Button>
                  </CardActions>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default NotificationSection;
