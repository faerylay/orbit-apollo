import React from 'react';
import { Dialog, DialogContent, DialogActions, DialogTitle, Button, Box, TextField, FormControl, FormLabel, FormControlLabel, RadioGroup, Radio, } from '@mui/material';

const UserDetailsEditDialog = ({ open, handleClose }) => {
  return (
    <Dialog maxWidth='xs' open={open} onClose={handleClose} scroll='paper'>
      <DialogTitle sx={{ fontSize: { xs: 16, sm: 20 } }}>
        Edit Details
      </DialogTitle>
      <DialogContent dividers={true}>
        <Box sx={{ pb: 2 }}>
          <TextField label='Username' size='small' defaultValue='Hello' />
        </Box>

        <Box sx={{ pb: 2 }}>
          <TextField
            label='Bio'
            size='small'
            defaultValue='Welcome to my profile'
          />
        </Box>
        <Box sx={{ pb: 2 }}>
          <TextField label='From' size='small' defaultValue='Yangon' />
        </Box>
        <Box sx={{ pb: 2 }}>
          <TextField label='Lived In' size='small' defaultValue='Japan,Tokyo' />
        </Box>

        <FormControl>
          <FormLabel>Gender</FormLabel>
          <RadioGroup row defaultValue='male'>
            <FormControlLabel
              value='male'
              control={<Radio size='small' />}
              label='Male'
            />
            <FormControlLabel
              value='female'
              control={<Radio size='small' />}
              label='Female'
            />
            <FormControlLabel
              value='other'
              control={<Radio size='small' />}
              label='Other'
            />
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button
          size='small'
          color='primary'
          variant='outlined'
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button size='small' color='primary' variant='contained'>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDetailsEditDialog;
