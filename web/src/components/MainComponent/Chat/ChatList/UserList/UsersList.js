import React from "react";
import { Box, IconButton, Typography } from '@mui/material'
import { IconSearch, IconDots } from '@tabler/icons'

import { useSelector } from "react-redux";
import { UserItems } from "./index";
import { useStyles } from "../styles";
import useWindowDimensions from "../../../../../hooks/useWindowDimensions";

const ChatUserList = ({ orient }) => {
  const { height } = useWindowDimensions()
  const classes = useStyles(orient)
  const auth = useSelector(state => state?.users?.user)

  return (
    <Box className={classes.main__chatUsersList}>
      <Box className={classes.chatlist__header}>
        <Typography component={'span'} variant={'h3'} color="HighlightText">Users</Typography>
        <IconButton size="small" className={classes.btnNobg}>
          <IconDots />
        </IconButton>
      </Box>
      <Box className={classes.chatlist__items} style={{ height: height - 180, maxHeight: height - 180 }}>
        <Box className={classes.chatList__search}>
          <Box className={classes.search_wrap}>
            <input type="text" placeholder="Search Here" required />
            <IconButton color="inherit" size="small" className={classes.searchBtn}>
              <IconSearch />
            </IconButton>
          </Box>
        </Box>
        <Box sx={{ paddingBlock: 1 }}>
          <Typography component={'span'} variant={'h4'} color="ButtonShadow">Followed users</Typography>
        </Box>
        {auth?.following?.map((item, index) => {
          return (
            <UserItems
              key={item.author.id}
              userId={item.author.id}
              fullName={item.author.fullName}
              image={item.author.image}
              isOnline={item.author.isOnline ? "active" : ""}
              animationDelay={index + 1}
            // active={item.author.active ? "active" : ""}
            />
          );
        })}
      </Box>
    </Box>
  )

}
export default ChatUserList