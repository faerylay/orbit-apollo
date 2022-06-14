import React from 'react';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { IconDots } from '@tabler/icons'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import { useDispatch } from 'react-redux';
import { PROFILE_OPEN } from '../../../../redux/';

const ChatContentMenu = () => {
  const dispatch = useDispatch()
  const openProfileDetail = (popupState) => {
    popupState.close()
    dispatch(PROFILE_OPEN(true))
  }
  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <>
          <IconButton {...bindTrigger(popupState)} color="inherit" size="small" >
            <IconDots />
          </IconButton>
          <Menu {...bindMenu(popupState)} anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}>
            <MenuItem onClick={() => openProfileDetail(popupState)} sx={{ display: { md: 'block', lg: 'none' } }}>
              <Typography>View Profile</Typography>
            </MenuItem>
            <MenuItem>
              <Typography>Delete Conversation</Typography>
            </MenuItem>
          </Menu>
        </>
      )}
    </PopupState>
  );
}
export default ChatContentMenu
