import React, { useState, createRef, useEffect, useCallback } from "react";
import { Avatar, Box, IconButton, Typography } from '@mui/material'
import { IconArrowNarrowLeft, IconSend, IconPlus, IconMoodSmile, IconPaperclip } from '@tabler/icons'
import { useMutation } from "@apollo/client";

import { useStyles } from "./styles";
import ChatItem from "./ChatItem";
import useWindowDimensions from "../../../../hooks/useWindowDimensions";
import { CREATE_MESSAGE, GET_CONVERSATIONS } from '../../../../graphql'
import ChatContentMenu from "./ChatContentMenu";
import { useDispatch, useSelector } from 'react-redux';
import { CHAT_OPEN } from "../../../../redux";
import { UserDetailDrawer } from "../ChatDrawer";


const ChatContent = ({ sender, receiver, messages }) => {
  const chat = useSelector(state => state.chat)
  const classes = useStyles()
  const { height } = useWindowDimensions()
  const messagesEndRef = createRef(null);
  const dispatch = useDispatch();
  const [messageText, setMessageText] = useState('');
  const [createMessage] = useMutation(CREATE_MESSAGE);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messagesEndRef])


  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!messageText) return;
    await createMessage({
      variables: {
        input: {
          sender: sender?.id,
          receiver: receiver ? receiver.id : null,
          message: messageText,
        },
      },
      refetchQueries: ({ data }) => {
        if (data && data.createMessage && data.createMessage.isFirstMessage) {
          return [
            {
              query: GET_CONVERSATIONS,
              variables: { authUserId: sender.id },
            },
          ];
        }
      },
    });
    setMessageText('');
  };

  const handleChange = (e) => {
    setMessageText(e.target.value)
  };
  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      sendMessage(e);
      scrollToBottom();
    }
  };

  return (
    <Box className={classes.main__chatcontent}>
      <Box className={classes.content__header}>
        <Box>
          <Box className={classes.current_chatting_user}>
            <IconButton onClick={() => dispatch(CHAT_OPEN(false))} sx={{ display: { xs: 'block', md: 'none' }, m: 0, mx: 1, p: 0 }}>
              <IconArrowNarrowLeft />
            </IconButton>
            <Box>
              <Box className={classes.avatarImg}>
                <Avatar sizes="medium" src={receiver?.image} alt="#" />
              </Box>
              <span className={classes[receiver?.isOnline]}></span>
            </Box>
            <Box>
              <Typography component='div' variant="subtitle1" color="CaptionText">{receiver?.fullName}</Typography>
              <Typography component='div' variant="subtitle2">Active Now</Typography>
            </Box>
          </Box>
        </Box>
        <Box>
          {/* <IconButton color="inherit" size="small" >
            <IconPhone />
          </IconButton>
          <IconButton color="inherit" size="small" >
            <IconVideo />
          </IconButton> */}
          <ChatContentMenu />
        </Box>
      </Box>
      <Box className={classes.content__body}
        sx={{
          height: height - 255,
          maxHeight: height - 255,
          minHeight: { xs: height - 140, md: height - 255 }
        }}>
        <Box sx={{ mr: 1 }}>
          {messages.map((item, index) => {
            return (
              <ChatItem
                key={item.id}
                animationDelay={index + 2}
                sender={sender?.id}
                users={item}
              />
            );
          })}
          <Box ref={messagesEndRef} />
        </Box>
      </Box>
      <Box className={classes.content__footer}>
        <IconButton color="inherit" size="large" className={classes.inputBtn}>
          <IconPlus />
        </IconButton>
        <IconButton color="inherit" size="large" className={classes.inputBtn}>
          <IconPaperclip />
        </IconButton>
        <IconButton color="inherit" size="large" className={classes.inputBtn}>
          <IconMoodSmile />
        </IconButton>
        <form onSubmit={sendMessage} className={classes.formControl}>
          <input
            onChange={handleChange}
            onKeyDown={onEnterPress}
            value={messageText}
            type="text"
            placeholder="Type a message here"
          />
          <IconButton type="submit" color="inherit" size="large" className={classes.btnSendMsg} >
            <IconSend />
          </IconButton>
        </form>
      </Box>
      <UserDetailDrawer drawerOpen={chat.profileOpened} getUser={receiver} />
    </Box>
  );

}
export default ChatContent