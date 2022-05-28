import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useApolloClient } from '@apollo/client';
import { Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';

import { MAX_USER_PROFILE_IMAGE_SIZE } from '../../../../../constants';
import {
  UPLOAD_PHOTO,
  GET_AUTH_USER,
  FETCH_USER,
  FETCH_ALL_USERS,
} from '../../../../../graphql';

import ProfileEditDialog from '../EditDialog/ProfileEditDialog';

const useStyles = makeStyles(() => ({
  root: { width: '100%', position: 'relative', cursor: 'pointer' },
  wrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    '& > *': { height: '100%', width: '100%' },
  },
}));

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
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
    ) : (
      <Avatar />
    );
  };

  return (
    <>
      <div onClick={() => setIsDialogOpen(true)} className={classes.root}>
        <div className={classes.wrapper}>
          {loading && <Avatar />}
          {!loading && renderProfileImage()}
        </div>
        <div style={{ paddingBottom: (1 / 1) * 100 + '%' }} />
      </div>
      <ProfileEditDialog
        title='Profile Photo'
        isOpen={isDialogOpen}
        close={() => setIsDialogOpen(false)}
      >
        <div style={{ maxWidth: '260px', maxHeight: '260px' }}>
          {!loading && renderProfileImage()}
        </div>
      </ProfileEditDialog>
    </>
  );
};
export default ProfileImage;
