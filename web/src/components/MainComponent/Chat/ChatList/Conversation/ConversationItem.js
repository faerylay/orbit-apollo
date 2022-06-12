import React from "react";
import moment from 'moment'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Avatar, Box, Typography, Badge, useTheme, useMediaQuery } from '@mui/material';

import { useStyles } from "../styles";

import { CHAT_OPEN } from '../../../../../redux'

const ConversationItem = (props) => {
  const theme = useTheme();
  const classes = useStyles(props);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  const selectChat = (e, userId) => {
    navigate(`/chat/${userId}`)
    if (matchDownMd) {
      dispatch(CHAT_OPEN(true))
    }
    for (
      let index = 0;
      index < e.currentTarget.parentNode.children.length;
      index++
    ) {
      e.currentTarget.parentNode.children[index].classList.remove("active");
    }
    e.currentTarget.classList.add("active");
  };
  const findUser = props?.user?.lastMessageCount?.filter(u => u.sender === props.user.id)
  const date = moment.unix(props?.user?.lastMessageCreatedAt).format('LT')

  return (
    <Box
      sx={{ padding: 0, margin: 0, animationDelay: `0.${props?.animationDelay}s` }}
      onClick={(e) => selectChat(e, props.user.id)}
      className={`${classes.chatlist__item} ${props?.active ? props?.active : ""
        } `}
    >
      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
        <Box className={classes.avatar}>
          <Box>
            <Avatar src={props?.user?.image} alt="#" />
          </Box>
          <Box sx={{ border: 1, borderColor: '#fff' }} className={`${classes['isOnline']}  ${classes[props?.isOnline]}`} />
        </Box>
        <Box className={classes.userMeta}>
          <Typography sx={{ fontWeight: 600 }} variant="h5" component="div">{props?.user?.fullName}</Typography>
          <Typography noWrap variant="subtitle2" > {props?.user?.lastMessageSender && 'You:'} {props?.user?.lastMessage ? props?.user?.lastMessage : 'No Replies..'}</Typography>
        </Box>
        <Box className={classes.userDate} >
          <Typography variant="caption" component="div">
            {props?.user?.lastMessageCreatedAt && date}
          </Typography>
          <Typography component="div" sx={{ alignSelf: 'flex-end', paddingInline: 2 }}>
            {
              !props?.user?.lastMessageSender && props?.user?.lastMessage && <Badge badgeContent={findUser?.length} color="primary" />
            }
          </Typography>
        </Box>
      </Box>
    </Box>
  );

}
export default ConversationItem