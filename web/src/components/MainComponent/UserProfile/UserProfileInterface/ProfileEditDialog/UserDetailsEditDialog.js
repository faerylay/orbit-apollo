import React from 'react';
import { Dialog, DialogContent, DialogActions, DialogTitle, Button, Box, TextField } from '@mui/material';
import { useMutation } from '@apollo/client';
import { UPDATE_BIO, GET_AUTH_USER } from '../../../../../graphql';
import { useModify } from '../../../../../hooks/hooks';

const UserDetailsEditDialog = ({ getUser, open, handleClose }) => {
  let bio = useModify(getUser?.bio ? getUser?.bio : '')
  const [updateBio, { loading, error }] = useMutation(UPDATE_BIO, {
    variables: {
      authUserId: getUser?.id,
      bio: bio.value,
    },
    refetchQueries: [
      { query: GET_AUTH_USER },
    ]
  })
  const handleSubmit = async (e) => {
    e.preventDefault()
    await updateBio()
    bio = ''
    handleClose()
  }

  return (
    <Dialog maxWidth='xs' open={open} onClose={handleClose} scroll='paper'>
      <DialogTitle sx={{ fontSize: { xs: 16, sm: 20 } }}>
        Edit Profile Details
      </DialogTitle>
      <form onSubmit={handleSubmit} >
        <DialogContent dividers={true}>
          <Box sx={{ pb: 2 }}>
            <TextField
              {...bio}
              error={error ? true : false}
              type='text'
              size='small'
              label='Bio'
              variant='outlined'
              placeholder='Bio...'
              required
            />
          </Box>
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
          <Button type='submit' size='small' color='primary' variant='contained' disabled={loading}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserDetailsEditDialog;
