import React, { useState } from 'react';
import { Box, Fab, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useApolloClient } from '@apollo/client';
import { IconCameraSelfie } from '@tabler/icons';

import { MAX_USER_COVER_IMAGE_SIZE } from '../../../../constants';
import { UPLOAD_PHOTO, GET_AUTH_USER, FETCH_USER, FETCH_ALL_USERS } from '../../../../graphql';

import { ProfileEditDialog } from './index';
import { useStyles } from '../styles';

const ProfileCoverImage = ({ getUser }) => {
  const auth = useSelector(state => state?.users?.user);
  const classes = useStyles()
  const client = useApolloClient();
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleImageChange = async e => {
    setLoading(true);
    const file = e.target.files[0];
    e.target.value = '';
    if (!file) return;
    if (file.size >= MAX_USER_COVER_IMAGE_SIZE) {
      console.error(
        `File size should be less then ${MAX_USER_COVER_IMAGE_SIZE / 1000000}MB`
      );
      setLoading(false);
      return;
    }
    try {
      await client.mutate({
        mutation: UPLOAD_PHOTO,
        variables: {
          input: {
            id: auth?.id,
            image: file,
            imagePublicId: getUser?.coverImagePublicId,
            isCover: true,
          },
        },
        refetchQueries: () => [
          { query: GET_AUTH_USER },
          { query: FETCH_USER, variables: { getUserId: getUser.id } },
          { query: FETCH_ALL_USERS },
        ],
      });
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const renderProfileCover = () => {
    return getUser?.coverImage ? (
      <img
        src={getUser?.coverImage}
        alt='profileCover'
        accept='image/x-png,image/jpeg'
        className={classes.renderProfileCover}
      />
    ) : (
      <Typography variant='h3' color="white">Not Cover Image Yet</Typography>
    );
  };

  return (
    <>
      <Box className={classes.coverImageBackground} onClick={() => setIsDialogOpen(true)}>
        {loading && (
          <Typography variant='h4' color="white"> Loading...</Typography>
        )}
        {!loading && renderProfileCover()}
      </Box>

      <Box className={classes.coverImageBtn} >
        {auth?.id === getUser?.id && (
          <label htmlFor='profileCover' >
            <input
              style={{ display: 'none' }}
              id='profileCover'
              name='profileCover'
              type='file'
              accept='image/x-png,image/jpeg'
              onChange={handleImageChange}
            />
            <Fab
              color='inherit'
              size='small'
              component='span'
              aria-label='add'
              variant='string'
              sx={{ boxShadow: 'none', background: '#fff' }}
              disableRipple={false}
              disableFocusRipple={false}
            >
              <IconCameraSelfie />
            </Fab>
          </label>
        )}
      </Box>

      <ProfileEditDialog
        title='Cover Photo'
        isOpen={isDialogOpen}
        close={() => setIsDialogOpen(false)}
      >
        {!loading && renderProfileCover()}
      </ProfileEditDialog>
    </>
  );
};
export default ProfileCoverImage;
