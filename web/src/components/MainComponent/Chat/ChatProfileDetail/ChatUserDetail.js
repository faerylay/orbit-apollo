import React from 'react'
import { Avatar, Box, Divider, IconButton, Typography, List, ListItem, ListItemAvatar, ListItemText, ListSubheader } from '@mui/material'
import { IconBrandFacebook, IconBrandTwitter, IconBrandGmail, IconBell, IconX } from '@tabler/icons'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import Medias from './Medias'
import useWindowDimensions from "../../../../hooks/useWindowDimensions";
import { PROFILE_OPEN } from '../../../../redux/'
import { FETCH_USER } from '../../../../graphql'
import { useStyles, IOSSwitch } from './styles'

export default function ChatUserDetail() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { height } = useWindowDimensions()
  const { userId } = useParams();

  const { data: { getUser } = {}, loading } = useQuery(FETCH_USER, {
    variables: { getUserId: userId },
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first"
  })
  return (
    <Box className={classes.chatProfile__main}>
      <Box className={classes.profile__header}>
        <IconButton onClick={() => dispatch(PROFILE_OPEN(false))} sx={{ display: { xs: 'block', lg: 'none' }, m: 0, p: 0, mr: 2 }}>
          <IconX />
        </IconButton>
        <Typography variant="h3" component="div">
          {loading ? 'loading....' : 'Profile'}
        </Typography>
      </Box>
      <Box className={classes.profile__body} style={{ height: height - 180, maxHeight: height - 180 }}>
        <Divider />
        <Box className={classes.profile__UserDetail}>
          <Box className={classes.profile__detail}>
            <Box className={classes.profile__image}>
              <Avatar className={classes.profile__avatar} src={getUser?.image} alt="#" />
            </Box>
            <Typography className={classes.profile__text} variant="h3" component="div">{getUser?.fullName}</Typography>
            <Typography className={classes.profile__text} variant="body1" component="div"> {getUser?.bio ? getUser.bio : 'Not Bio Yet'}</Typography>
            <Box className={classes.profile__logos}>
              <IconButton color="inherit" size="small" >
                <IconBrandFacebook />
              </IconButton>
              <IconButton color="inherit" size="small" >
                <IconBrandTwitter />
              </IconButton>
              <IconButton color="inherit" size="small" >
                <IconBrandGmail />
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Divider />
        <Box className={classes.chatProfile__footer}>
          <Medias />
          <List sx={{ bgcolor: 'background.paper' }}
            subheader={<ListSubheader>Settings</ListSubheader>}
          >
            <ListItem secondaryAction={
              <IOSSwitch defaultChecked />
            }>
              <ListItemAvatar>
                <IconBell />
              </ListItemAvatar>
              <ListItemText primary={<Typography>Notification</Typography>} />
            </ListItem>
          </List>
        </Box>
      </Box>
    </Box>
  )
}
