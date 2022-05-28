import React from "react";
import moment from 'moment'
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Typography, Badge } from '@mui/material'
import { useStyles } from "../styles";

const ConversationItem = (props) => {
  const navigate = useNavigate()
  const classes = useStyles(props)
  const selectChat = (e, userId) => {
    navigate(`/chat/${userId}`)
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
      <Box sx={{ display: 'flex' }}>
        <Box className={classes.avatar}>
          <Box>
            <Avatar src={props?.user?.image} alt="#" />
          </Box>
          <Typography className={`${classes['isOnline']}  ${classes[props?.isOnline]}`}></Typography>
        </Box>
        <Box className={classes.userMeta} >
          <Typography sx={{ fontWeight: 600 }} variant="h5" component="div">{props?.user?.fullName}</Typography>
          <Typography variant="subtitle2" component="span"> {props?.user?.lastMessageSender && 'You:'} {props?.user?.lastMessage ? props?.user?.lastMessage : 'No Replies..'}</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
  );

}
export default ConversationItem