import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from '@mui/material';

import { ListItemWrapper } from '../styles';

const FollowerFollowingDialog = ({
  list,
  title,
  open,
  handleClose,
  scroll,
}) => {
  const navigate = useNavigate();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={scroll}
      aria-labelledby='scroll-dialog-title'
      aria-describedby='scroll-dialog-description'
    >
      <DialogTitle
        id='scroll-dialog-title'
        sx={{ fontSize: { xs: 16, sm: 20 } }}
      >
        {title}
      </DialogTitle>
      <DialogContent dividers={scroll === 'paper'}>
        {list?.map(person => {
          const { id, author, follower } = person;

          const p = author ? author : follower;

          return (
            <ListItemWrapper key={id}>
              <List>
                <ListItem onClick={() => navigate(`/profile/${p.id}`)}>
                  <ListItemAvatar>
                    <Avatar alt='Remy Sharp' />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography sx={{ textTransform: 'capitalize' }}>
                        {p.fullName}
                      </Typography>
                    }
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component='span'
                          variant='body2'
                          color='text.primary'
                        >
                          Morning
                        </Typography>
                        {' — have a beautiful day guys'}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </List>
            </ListItemWrapper>
          );
        })}
        <Divider />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default FollowerFollowingDialog;
