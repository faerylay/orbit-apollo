import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useApolloClient } from '@apollo/client';
import { Avatar, Box, Fab } from '@mui/material';
import { IconCameraSelfie } from '@tabler/icons';

import { MAX_USER_PROFILE_IMAGE_SIZE } from '../../../../constants';
import { UPLOAD_PHOTO, GET_AUTH_USER, FETCH_USER, FETCH_ALL_USERS, } from '../../../../graphql';

import { ProfileEditDialog } from './index';
import { useStyles } from '../styles';

const ProfileImage = ({ getUser }) => {
  const classes = useStyles();
  const client = useApolloClient();
  const auth = useSelector(state => state?.users.user);
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleImageChange = async e => {
    setLoading(true);

    const file = e.target.files[0];
    e.target.value = '';

    if (!file) return;

    if (file.size >= MAX_USER_PROFILE_IMAGE_SIZE) {
      setLoading(false);
      console.error(
        `File size should be less then ${MAX_USER_PROFILE_IMAGE_SIZE / 1000000
        }MB`
      );
      return;
    }

    try {
      await client.mutate({
        mutation: UPLOAD_PHOTO,
        variables: {
          input: {
            id: auth?.id,
            image: file,
            imagePublicId: getUser?.imagePublicId,
            isCover: false,
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

  const renderProfileImage = () => {
    return getUser?.image ? (
      <img
        src={getUser?.image}
        alt='profile'
        accept='image/x-png,image/jpeg'
        className={classes.profileImage}
      />
    ) : (
      <Avatar />
    );
  };

  return (
    <>
      <div className={classes.profileRoot}>
        <div onClick={() => setIsDialogOpen(true)} className={classes.profileRootWrapper}>
          {loading && <Avatar />}
          {!loading && renderProfileImage()}
        </div>

        <div style={{ paddingBottom: (1 / 1) * 100 + '%' }} />
      </div>
      <Box className={classes.profileImageinputLabel} >
        {auth?.id === getUser?.id && (
          <label htmlFor='profileImage' >
            <input
              style={{ display: "none" }}
              id="profileImage"
              name="profileImage"
              type="file"
              accept="image/x-png,image/jpeg"
              onChange={handleImageChange}
            />
            <Fab
              color='inherit'
              size='small'
              className={classes.profileImageFab}
              disableRipple={false}
              disableFocusRipple={false}
              component='p'
              aria-label='add'
              variant='string'
            >
              <IconCameraSelfie />
            </Fab>
          </label>
        )}
      </Box>
      <ProfileEditDialog
        isOpen={isDialogOpen}
        close={() => setIsDialogOpen(false)}
      >
        <div >
          {!loading && renderProfileImage()}
        </div>
      </ProfileEditDialog>
    </>
  );
};
export default ProfileImage;
