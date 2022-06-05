import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useTheme } from '@emotion/react';
import { useApolloClient } from '@apollo/client'
import { IconSquarePlus } from '@tabler/icons';
import { Box, Fab, Avatar, Typography } from '@mui/material';



import { MAX_USER_PROFILE_IMAGE_SIZE } from '../../../../constants'
import { UPLOAD_PHOTO, GET_AUTH_USER, FETCH_USER, FETCH_ALL_USERS } from '../../../../graphql'


const ProfileImage = ({ getUser, isUserOnline, userId }) => {
  const theme = useTheme();
  const client = useApolloClient();
  const [loading, setLoading] = useState(false);
  const auth = useSelector(state => state?.users.user);

  const handleImageChange = async (e) => {
    setLoading(true);

    const file = e.target.files[0];
    e.target.value = '';

    if (!file) return;

    if (file.size >= MAX_USER_PROFILE_IMAGE_SIZE) {
      setLoading(false);
      console.error(`File size should be less then ${MAX_USER_PROFILE_IMAGE_SIZE / 1000000}MB`);
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
            isCover: false
          }
        },
        refetchQueries: () => [
          { query: GET_AUTH_USER },
          { query: FETCH_USER, variables: { getUserId: getUser.id } },
          { query: FETCH_ALL_USERS }
        ],
      });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  const renderProfileImage = () => {
    if (loading) return <Typography>loading...</Typography>;
    return getUser?.image ? (
      <Box sx={{ mt: 1.5, ml: 2.2 }}>
        <img src={getUser?.image} alt="profile" accept="image/x-png,image/jpeg" style={{ width: 50, height: 50, borderRadius: 30, border: `2px solid ${isUserOnline && auth?.id !== userId ? theme.palette.success.dark : 'dodgerblue'}` }} />
      </Box>
    ) : <Avatar sx={{ mt: 1.5, width: 50, height: 50, borderRadius: 30, }} />
  }


  return (
    <Box sx={{ width: 120, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
      <Box sx={{ width: 60, height: 60, borderRadius: 50, ml: 1 }}>
        {renderProfileImage()}
      </Box>
      {
        auth?.id === getUser.id && (
          <label htmlFor="profileImage">
            <input
              style={{ display: "none" }}
              id="profileImage"
              name="profileImage"
              type="file"
              accept="image/x-png,image/jpeg"
              onChange={handleImageChange}
            />
            <Fab
              color="inherit"
              size="small"
              component="span"
              aria-label="add"
              variant="string"
              sx={{ mt: 4, boxShadow: 'none', background: 'none' }}
              disableRipple={true}
              disableFocusRipple={true}
            >
              <IconSquarePlus />
            </Fab>
          </label>
        )
      }

    </Box>

  )
}
export default ProfileImage


