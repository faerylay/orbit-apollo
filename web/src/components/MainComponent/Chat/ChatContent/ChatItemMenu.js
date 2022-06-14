import React from 'react';
import { IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { IconDotsVertical } from '@tabler/icons'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

const ChatItemMenu = () => {

  return (
    <PopupState variant="popover" popupId="demo-popup-menu">
      {(popupState) => (
        <>
          <IconButton {...bindTrigger(popupState)} color="primary" size="small" disableRipple>
            <IconDotsVertical size={18} />
          </IconButton>
          <Menu {...bindMenu(popupState)}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}>
            {/* {
              auth?.id === userId && (
                <Box>
                  <MenuItem onClick={() => deleting(popupState)}>Delete</MenuItem>
                  <MenuItem >
                    <Link to={`/update-post/${postId}`} style={{ textDecoration: 'none', color: '#868686' }}>
                      <Typography >Update Post</Typography>
                    </Link>
                  </MenuItem>
                </Box>
              )
            } */}
            <MenuItem>
              <Typography>Like</Typography>
            </MenuItem>
            <MenuItem >
              <Typography>Copy</Typography>
            </MenuItem>
            {/* <MenuItem>
              <Typography>Delete</Typography>
            </MenuItem>
            <MenuItem>
              <Typography>Reply</Typography>
            </MenuItem> */}
          </Menu>
        </>
      )}
    </PopupState>
  );
}
export default ChatItemMenu
