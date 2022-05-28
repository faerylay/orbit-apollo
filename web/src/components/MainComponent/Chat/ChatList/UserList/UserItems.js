import React from "react";
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Avatar } from '@mui/material'
import { useStyles } from "../styles";


const UserItems = ({ userId, fullName, image, isOnline, animationDelay }) => {
  const navigate = useNavigate()
  const classes = useStyles()
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



  return (
    <Box
      sx={{ padding: 0, margin: 0, animationDelay: `0.${animationDelay}s` }}
      onClick={(e) => selectChat(e, userId)}
      className={`${classes.chatlist__item}  `}
    >
      <Box sx={{ display: 'flex' }}>
        <Box className={classes.avatar}>
          <Box>
            <Avatar alt="..." src={image ? image : null} />
          </Box>
          <Typography className={`${classes['isOnline']}  ${classes[isOnline]}`}></Typography>
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