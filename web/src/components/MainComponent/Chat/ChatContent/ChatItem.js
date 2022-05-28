import React from "react";
import moment from 'moment'
import { Avatar, Box, IconButton, Typography } from '@mui/material'
import { IconDotsVertical } from '@tabler/icons'
import { useStyles } from "./styles";

const ChatItem = (props) => {
  const classes = useStyles(props)

  return (
    <Box
      style={{ animationDelay: props.animationDelay }}
      className={`${classes.chat__item} ${classes.other}`}
    >
      <Box className={classes.chat__item__content}>
        <Box className={classes.chat__meta}>
          <Typography className={classes.chat__msg} component="div">{props.users.message}</Typography>
        </Box>
        <Box className={classes.chat__item__menu}>
          <IconButton color="inherit" size="small" disableRipple>
            <IconDotsVertical size={18} />
          </IconButton>
        </Box>
        <Typography className={classes.chat__time} component="div">{moment.unix(props.users.createdAt).fromNow()}</Typography>
      </Box>
      <Box className={classes.avatar}>
        <Box>
          <Avatar src={props.users?.receiver ? props.users?.sender?.image : props.users?.receiver?.image} alt="#" />
        </Box>
        <span className={`${classes['isOnline']}  ${classes[props.users?.isOnline]}`}></span>
      </Box>
    </Box>
  );

}
export default ChatItem