import React from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';

import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

export default function EditBtn() {
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
      <IconButton size='small' onClick={handleClick}>
        <MoreVertRoundedIcon fontSize='small' />
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
        <MenuItem onClick={handleClose}>Upload Photo</MenuItem>
        <MenuItem onClick={handleClose}>Save Photo</MenuItem>
      </Menu>
    </div>
  );
}
