import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider } from '@mui/material';
import { useStyles, ListItemWrapper } from './styles'

const Followers = ({ getUser }) => {
  const classes = useStyles();
  const navigate = useNavigate()
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <>
      <IconButton sx={{ mx: 1 }} color="inherit" className={classes.root} size="large" disableRipple onClick={handleClickOpen('paper')}>
        <Typography sx={{ mt: -1 }}>{getUser?.followerCount}</Typography>
        <Typography>Followers</Typography>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Followers Users List</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          {getUser?.followers?.map(follower => (
            <ListItemWrapper key={follower.id} >
              <List>
                <ListItem onClick={() => navigate(`/profile/${follower.follower.id}`)}>
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography sx={{ textTransform: 'capitalize' }}>{follower.follower.fullName}</Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                          Morning
                        </Typography>
                        {" — have a beautiful day guys"}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>
            </ListItemWrapper>
          ))}
          <Divider />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
export default Followers