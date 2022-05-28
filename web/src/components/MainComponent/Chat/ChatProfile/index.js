import React from 'react'
import { Avatar, Box, Divider, IconButton, Typography, List, ListItem, ListItemAvatar, ListItemText, ListSubheader } from '@mui/material'
import { IconBrandFacebook, IconBrandTwitter, IconBrandGmail, IconBell } from '@tabler/icons'
import { useStyles, IOSSwitch } from './styles'
import Medias from './Medias'


export default function ChatProfile({ receiver }) {
  const classes = useStyles()

  return (
    <Box className={classes.chatProfile__main}>
      <Box className={classes.profile__title}>
        <Typography variant="h3" component="div">Profile</Typography>
      </Box>
      <Divider />
      <Box className={classes.profile__header}>
        <Box className={classes.profile__detail}>
          <Box className={classes.profile__image}>
            <Avatar className={classes.profile__avatar} src={receiver?.image} alt="#" />
          </Box>
          <Typography className={classes.profile__text} variant="h3" component="div">{receiver?.fullName}</Typography>
          <Typography className={classes.profile__text} variant="body1" component="div">I`m Junior Developer</Typography>
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
  )
}
