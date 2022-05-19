import React from 'react'
import { useNavigate } from 'react-router-dom';
import { IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { KeyboardArrowDownOutlined } from '@mui/icons-material';

export default function PostWhoLike({ liked }) {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div >
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <KeyboardArrowDownOutlined></KeyboardArrowDownOutlined>
      </IconButton>

      {
        !liked?.length ? null : (
          <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button' }}>
            {
              liked?.map(like => {
                return (
                  <MenuItem key={like.id} onClick={() => navigate(`/profile/${like.user.id}`)}>
                    <Avatar alt={like.user.fullName?.charAt(0).toUpperCase()} src={like?.user?.image} sx={{ width: 30, height: 30, backgroundColor: 'skyblue', mr: 1, fontSize: 14 }} />
                    {like.user.fullName} . liked Post
                  </MenuItem>
                )
              })
            }
          </Menu>
        )
      }
    </div>
  )
}
