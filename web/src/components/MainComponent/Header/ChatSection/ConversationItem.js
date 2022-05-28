import React from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux';
import { Badge, Box, Typography, ListItemAvatar, ListItemButton, ListItemText, Avatar } from '@mui/material';
import { useStyles } from './styles';

const ConversationItem = (props) => {
  const classes = useStyles(props)
  const customization = useSelector((state) => state.customization);
  const findUser = props?.user?.lastMessageCount?.filter(u => u.sender === props.user.id)
  const date = moment.unix(props?.user?.lastMessageCreatedAt).format('LT')

  return (
    <Box className={classes.chat__item}>
      <ListItemButton sx={{ borderRadius: `${customization.borderRadius}px`, padding: 1 }}>
        <ListItemAvatar>
          <Avatar alt="#" src={props?.user?.image} />
        </ListItemAvatar>
        <ListItemText
          primary={<Typography variant="h5">{props?.user?.fullName}</Typography>}
          secondary={
            <Typography sx={{ display: 'inline' }} component="span" variant="body1" color="text.primary"  >
              {props?.user?.lastMessageSender && 'You:'} {props?.user?.lastMessage ? props?.user?.lastMessage : 'No Replies..'}
            </Typography>
          }
        />
        <Box>
          <ListItemText
            primary={
              <Typography variant="caption" component="div">
                {props?.user?.lastMessageCreatedAt && date}
              </Typography>
            }
            secondary={
              <Typography component="div" sx={{ alignSelf: 'flex-end', paddingInline: 2 }}>
                {
                  !props?.user?.lastMessageSender && props?.user?.lastMessage && <Badge badgeContent={findUser?.length} color="primary" />
                }
              </Typography>
            }
          />
        </Box>
      </ListItemButton>
    </Box>
  );
}
export default ConversationItem