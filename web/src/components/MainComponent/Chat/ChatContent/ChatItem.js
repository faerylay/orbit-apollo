import React from "react";
import moment from 'moment'
import { Avatar, Box, Typography } from '@mui/material'
import { useStyles } from "./styles";
import ChatItemMenu from "./ChatItemMenu";

const ChatItem = (props) => {
  const classes = useStyles(props)

  return (
    <Box
      style={{ animationDelay: props.animationDelay }}
      className={`${classes.chat__item} ${classes.other}`}
    >
      <Box className={classes.chat__item__menu}>
        <ChatItemMenu />
      </Box>
      <Box className={classes.chat__item__content}>
        <Box className={classes.chat__meta}>
          <Typography className={classes.chat__msg} component="div">{props.users.message}</Typography>
        </Box>
        <Typography className={classes.chat__time} component="div">{moment.unix(props.users.createdAt).fromNow()}</Typography>
      </Box>
      <Box className={classes.avatar} >
        <Avatar sx={{ width: 35, height: 35 }} src={props.users?.receiver ? props.users?.sender?.image : props.users?.receiver?.image} alt="#" />
        <span className={`${classes['isOnline']}  ${classes[props.users?.isOnline]}`}></span>
      </Box>
    </Box>
  );

}
export default ChatItem