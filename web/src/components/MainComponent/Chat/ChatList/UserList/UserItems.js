import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { Box, Typography, Avatar, useTheme, useMediaQuery } from '@mui/material'
import { useStyles } from "../styles";
import { CHAT_OPEN } from "../../../../../redux";


const UserItems = ({ userId, fullName, image, isOnline, animationDelay }) => {
  const navigate = useNavigate()
  const theme = useTheme();
  const classes = useStyles()
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



  return (
    <Box
      sx={{ padding: 0, margin: 0, animationDelay: `0.${animationDelay}s` }}
      onClick={(e) => selectChat(e, userId)}
      className={`${classes.chatlist__item}  `}
    >
      <Box sx={{ display: 'flex', width: '100%' }}>
        <Box className={classes.avatar}>
          <Box>
            <Avatar alt="..." src={image ? image : null} />
          </Box>
          <Typography sx={{ border: 1, borderColor: '#fff' }} className={`${classes['isOnline']}  ${classes[isOnline]}`}></Typography>
        </Box>
        <Box className={classes.userMeta}>
          <Typography variant="subtitle1" component="div">{fullName}</Typography>
          <Typography variant="subtitle2" component="div">32 mins ago</Typography>
        </Box>
      </Box>
    </Box>
  );

}
export default UserItems