import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Badge, Menu, MenuItem, Avatar } from '@mui/material';
import { IconThumbUp } from '@tabler/icons';

const CommentWhoLike = ({ comment }) => {
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
    <>
      <Button size='small' onClick={handleClick}>
        <Badge badgeContent={comment?.commentlikes?.length}  >
          <IconThumbUp />
        </Badge>
      </Button>
      {
        !comment?.commentlikes?.length ? null : (
          <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button' }}>
            {
              comment?.commentlikes?.map(comment => (
                <MenuItem key={comment.id} onClick={() => navigate(`/profile/${comment.user.id}`)}>
                  <Avatar alt={comment.user.fullName?.charAt(0).toUpperCase()} src={comment?.user?.image} sx={{ width: 30, height: 30, backgroundColor: 'skyblue', mr: 1, fontSize: 14 }} />
                  {comment.user.fullName} . liked comment
                </MenuItem>
              ))
            }
          </Menu>
        )
      }

    </>
  )
}
export default CommentWhoLike