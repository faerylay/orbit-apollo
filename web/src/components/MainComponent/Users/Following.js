import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, Avatar, List, ListItem, ListItemAvatar, ListItemText, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useStyles } from './styles'

const Following = ({ getUser }) => {
  const navigate = useNavigate()
  const classes = useStyles();
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
  const ListItemWrapper = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    background: theme.palette.background.paper,
    padding: 8,
    '&:hover': {
      background: theme.palette.secondary.light
    },
    '& .MuiListItem-root': {
      padding: 0
    },
  }));
  return (
    <>
      <IconButton color="inherit" className={classes.root} size="large" disableRipple onClick={handleClickOpen('paper')}>
        <Typography sx={{ mt: -1 }}>{getUser?.followingCount}</Typography>
        <Typography>Following</Typography>
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Following Users List</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          {getUser?.following?.map(following => (
            <ListItemWrapper key={following.id} >
              <List>
                <ListItem onClick={() => navigate(`/profile/${following.author.id}`)}>
                  <ListItemAvatar>
                    <Avatar alt="Remy Sharp" />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography sx={{ textTransform: 'capitalize' }}>{following.author.fullName}</Typography>
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
export default Following