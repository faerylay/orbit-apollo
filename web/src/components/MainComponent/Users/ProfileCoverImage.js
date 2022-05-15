import React, { useState } from 'react';
import { Box, Fab, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useApolloClient } from '@apollo/client';
import AddIcon from '@mui/icons-material/Add';
// import { IconSquarePlus } from '@tabler/icons';

import { MAX_USER_COVER_IMAGE_SIZE } from '../../../constants';
import {
  UPLOAD_PHOTO,
  ME,
  FETCH_USER,
  FETCH_ALL_USERS,
} from '../../../graphql';

const ProfileCoverImage = ({ getUser }) => {
  const auth = useSelector((state) => state?.users?.user);
  const client = useApolloClient();
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e) => {
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
          { query: ME },
          { query: FETCH_USER, variables: { getUserId: getUser.id } },
          { query: FETCH_ALL_USERS },
        ],
      });
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };
  return (
    <Box sx={{ height: '100%' }}>
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          borderRadius: 3,
          background: 'dodgerblue',
          position: 'relative',
        }}
      >
        {getUser?.coverImage ? (
          <img
            src={getUser?.coverImage}
            alt='profileCover'
            accept='image/x-png,image/jpeg'
            style={{ width: '100%', height: '100%', borderRadius: 10 }}
          />
        ) : (
          <Typography variant='h4' sx={{ color: '#fff' }}>
            Not Cover Image Yet{' '}
          </Typography>
        )}
        {loading && <Typography>loading...</Typography>}
        {auth?.id === getUser?.id && (
          <Box sx={{ position: 'absolute', right: '5%', bottom: '37%' }}>
            <label htmlFor='profileCover'>
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
                size='medium'
                component='span'
                aria-label='add'
                variant='string'
                sx={{ boxShadow: 'none', position: 'absolute', ml: -5, mt: 4 }}
                disableRipple={true}
                disableFocusRipple={true}
              >
                <AddIcon />
              </Fab>
            </label>
          </Box>
        )}
        l
      </Box>
    </Box>
  );
};
export default ProfileCoverImage;
