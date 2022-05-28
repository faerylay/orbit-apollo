import React, { useState } from 'react';
import { Box, Fab, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useApolloClient } from '@apollo/client';
import { IconSquarePlus } from '@tabler/icons';

import { MAX_USER_COVER_IMAGE_SIZE } from '../../../../../constants';
import {
  UPLOAD_PHOTO,
  GET_AUTH_USER,
  FETCH_USER,
  FETCH_ALL_USERS,
} from '../../../../../graphql';

import ProfileEditDialog from '../EditDialog/ProfileEditDialog';

const ProfileCoverImage = ({ getUser }) => {
  const auth = useSelector(state => state?.users?.user);
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
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
    ) : (
      <Typography variant='h4' sx={{ color: '#fff' }}>
        Not Cover Image Yet
      </Typography>
    );
  };

  return (
    <>
      <Box
        sx={{
          height: '100%',
          background: 'dodgerblue',
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => setIsDialogOpen(true)}
        >
          {loading && (
            <Typography variant='h4' sx={{ color: '#fff' }}>
              Loading...
            </Typography>
          )}

          {!loading && renderProfileCover()}
        </div>
      </Box>

      {auth?.id === getUser?.id && (
        <label
          htmlFor='profileCover'
          style={{ position: 'absolute', right: 20, bottom: 20 }}
        >
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
            sx={{ boxShadow: 'none' }}
            disableRipple={true}
            disableFocusRipple={true}
          >
            <IconSquarePlus />
          </Fab>
        </label>
      )}

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
