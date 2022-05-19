import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Switch, CardContent, Card, Avatar, Box, Chip, ClickAwayListener, Divider, Grid, InputAdornment, List, ListItemButton, ListItemIcon, ListItemText, OutlinedInput, Paper, Popper, Stack, Typography } from '@mui/material';
import { IconLogout, IconSearch, IconSettings, IconUser } from '@tabler/icons';

import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';

import MainCard from '../../Helpers/cards/MainCard';
import { Transitions } from '../../../MainComponent';
import UpgradePlanCard from './UpgradePlanCard';
import { LOG_OUT } from '../../../../graphql'
import { isLoggedIn, forgetLogin } from '../../../../auth'

const ProfileSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const customization = useSelector((state) => state.customization);
  const auth = useSelector((state) => state?.users?.user)

  const [logOut, { loading }] = useMutation(LOG_OUT)
  const handleLogout = async () => {
    await logOut()
    forgetLogin()
    navigate('/login')
    window.location.reload(false)
  };

  const [sdm, setSdm] = useState(true);
  const [value, setValue] = useState('');
  const [notification, setNotification] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };
  const handleListItemClick = (event, index, route = '') => {
    setSelectedIndex(index);
    handleClose(event);

    if (route && route !== '') {
      navigate(route);
    }
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);


  return (
    <>
      <Chip
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            '& svg': {
              stroke: theme.palette.primary.light
            }
          },
          '& .MuiChip-label': {
            lineHeight: 0
          }
        }}
        icon={
          <Avatar
            src={'https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg'}
            sx={{
              ...theme.typography.mediumAvatar,
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer'
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={<IconSettings stroke={1.5} size="1.5rem" color={theme.palette.primary.main} />}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
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
                offset: [0, 14]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <Box sx={{ p: 2 }}>
                    <Stack>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Typography variant="h4">Good Morning,</Typography>
                        <Typography component="span" variant="h4" sx={{ fontWeight: 400 }}>
                          {auth?.fullName}
                        </Typography>
                      </Stack>
                      <Typography variant="subtitle2">Project Admin</Typography>
                    </Stack>
                    <OutlinedInput
                      sx={{ width: '100%', pr: 1, pl: 2, my: 2 }}
                      id="input-search-profile"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      placeholder="Search profile options"
                      startAdornment={
                        <InputAdornment position="start">
                          <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
                        </InputAdornment>
                      }
                      aria-describedby="search-helper-text"
                      inputProps={{
                        'aria-label': 'weight'
                      }}
                    />
                    <Divider />
                  </Box>
                  <Box sx={{ p: 2, height: '100%', maxHeight: 'calc(100vh - 250px)', overflowX: 'hidden' }}>
                    <UpgradePlanCard />
                    <Divider />
                    <Card
                      sx={{
                        bgcolor: theme.palette.primary.light,
                        my: 2
                      }}
                    >
                      <CardContent>
                        <Grid container spacing={3} direction="column">
                          <Grid item>
                            <Grid item container alignItems="center" justifyContent="space-between">
                              <Grid item>
                                <Typography variant="subtitle1">Start DND Mode</Typography>
                              </Grid>
                              <Grid item>
                                <Switch
                                  color="primary"
                                  checked={sdm}
                                  onChange={(e) => setSdm(e.target.checked)}
                                  name="sdm"
                                  size="small"
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid item container alignItems="center" justifyContent="space-between">
                              <Grid item>
                                <Typography variant="subtitle1">Allow Notifications</Typography>
                              </Grid>
                              <Grid item>
                                <Switch
                                  checked={notification}
                                  onChange={(e) => setNotification(e.target.checked)}
                                  name="sdm"
                                  size="small"
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                    <Divider />
                    <List
                      component="nav"
                      sx={{
                        width: '100%',
                        maxWidth: 350,
                        minWidth: 300,
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: '10px',
                        [theme.breakpoints.down('md')]: {
                          minWidth: '100%'
                        },
                        '& .MuiListItemButton-root': {
                          mt: 0.5
                        }
                      }}
                    >
                      {
                        Boolean(isLoggedIn()) ? (
                          <>
                            <ListItemButton
                              sx={{ borderRadius: `${customization.borderRadius}px` }}
                              selected={selectedIndex === 0}
                              onClick={(event) => handleListItemClick(event, 0, '/user/account-profile/profile1')}
                            >
                              <ListItemIcon>
                                <IconSettings stroke={1.5} size="1.3rem" />
                              </ListItemIcon>
                              <ListItemText primary={<Typography variant="body2">Account Settings</Typography>} />
                            </ListItemButton>
                            <ListItemButton
                              sx={{ borderRadius: `${customization.borderRadius}px` }}
                              selected={selectedIndex === 1}
                              onClick={(event) => handleListItemClick(event, 1, `/profile/${auth?.id}`)}
                            >
                              <ListItemIcon>
                                <IconUser stroke={1.5} size="1.3rem" />
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  <Grid container spacing={1} justifyContent="space-between">
                                    <Grid item>
                                      <Typography variant="body2">{auth?.fullName}</Typography>
                                    </Grid>
                                    <Grid item>
                                      <Chip
                                        label="02"
                                        size="small"
                                        sx={{
                                          bgcolor: theme.palette.warning.dark,
                                          color: theme.palette.background.default
                                        }}
                                      />
                                    </Grid>
                                  </Grid>
                                }
                              />
                            </ListItemButton>
                            <ListItemButton
                              sx={{ borderRadius: `${customization.borderRadius}px` }}
                              selected={selectedIndex === 4}
                              onClick={handleLogout}
                            >
                              <ListItemIcon>
                                <IconLogout stroke={1.5} size="1.3rem" />
                              </ListItemIcon>
                              <ListItemText primary={<Typography variant="body2"> {loading ? 'loading...' : 'Logout'}</Typography>} />
                            </ListItemButton>
                          </>
                        ) : (
                          <ListItemButton
                            sx={{ borderRadius: `${customization.borderRadius}px` }}
                            selected={selectedIndex === 0}
                            onClick={(event) => handleListItemClick(event, 0, '/login')}
                          >
                            <ListItemIcon>
                              <IconUser stroke={1.5} size="1.3rem" />
                            </ListItemIcon>
                            <ListItemText primary={<Typography variant="body2">Login</Typography>} />
                          </ListItemButton>
                        )
                      }
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

export default ProfileSection;
