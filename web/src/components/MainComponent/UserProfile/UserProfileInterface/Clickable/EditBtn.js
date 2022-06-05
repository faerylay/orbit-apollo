import React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { IconDotsVertical, IconX } from '@tabler/icons';

export default function EditBtn({ close }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div>
      <IconButton size='small' onClick={close} style={{ position: 'absolute', top: 0, left: 0 }}>
        <IconX fontSize='small' color="white" />
      </IconButton>
      <IconButton size='small' onClick={handleClick} style={{ position: 'absolute', top: 0, right: 0 }}>
        <IconDotsVertical fontSize='small' color="white" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Save Photo</MenuItem>
      </Menu>
    </div>
  );
}
