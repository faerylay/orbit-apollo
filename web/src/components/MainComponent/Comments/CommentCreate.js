import React, { useState } from 'react';
import { useMutation, useApolloClient } from '@apollo/client'
import { useSelector } from 'react-redux';

import { Paper, TextField, Button, Box, Grid, Fab, Typography, Avatar } from '@mui/material';
import { IconSquarePlus } from '@tabler/icons';

import { CREATE_COMMENT, FETCH_POSTS_QUERY, FETCH_POST, ME, USER_MENTION } from '../../../graphql';
import { MAX_POST_IMAGE_SIZE, NotificationType } from '../../../constants'
import useNotifications from '../../../hooks/useNotifications'

// import { MentionsInput, Mention } from 'react-mentions'
const CommentCreate = ({ postId, author }) => {
  const client = useApolloClient()
  const notification = useNotifications()
  const auth = useSelector(state => state?.users?.user)

  const [errors, setErrors] = useState('')
  const [text, setText] = useState('')
  const [image, setImage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const [userList, setUserList] = useState([])
  const [mentions, setMentions] = useState([])
  const [isOpenSearchResult, setIsOpenSearchResult] = useState(false)

  const [createComment, { loading }] = useMutation(CREATE_COMMENT, {
    onError(err) {
      setErrors(err?.graphQLErrors[0]?.message)
    },
    variables: {
      input: {
        postId,
        comment: text,
        image: image ? image : null,
        mentions: mentions ? mentions : null
      }
    },
    refetchQueries: [
      { query: FETCH_POSTS_QUERY },
      { query: FETCH_POST, variables: { postId } },
      { query: ME },
    ]
  })

  const handlePostImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size >= MAX_POST_IMAGE_SIZE) {
      console.error(`File size should be less then ${MAX_POST_IMAGE_SIZE / 1000000}MB`);
      return;
    }
    setImage(file);
    e.target.value = null;
  }

  if (isOpenSearchResult && searchQuery) {
    const search = async () => {
      const { data } = await client.query({
        query: USER_MENTION,
        variables: {
          searchQuery: searchQuery,
          postId
        },
      });
      setUserList(data.userMentionSearch)
    };
    search()
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    const format = /@[A-Za-z0-9]{1,30}$/g;
    if (format.test(value)) {
      setIsOpenSearchResult(true)
      setSearchQuery(value?.match(format)?.toString()?.replace(/[@]/, ' ')?.trim())
    } else {
      setIsOpenSearchResult(false)
    }
    setText(value)
  }

  const startMention = (e, user) => {
    setText(text.substring(0, text.lastIndexOf('@') + 1) + user.fullName)
    setMentions([...mentions, { userId: user.id, fullName: user.fullName }])
    setIsOpenSearchResult(false)
  }

  // const ok = text?.match(/@[A-Za-z0-9]{1,30}/g)
  // const test = ok?.map((element) => element?.replace(/[^a-zA-Z ]/, ''));
  // const testing = mentions?.filter(item => test?.indexOf(item) > -1)
  // console.log(testing)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data } = await createComment()
    if (auth?.id) {
      const mention = mentions?.map(item => item?.userId)
      notification.create({
        userId: author?.id,
        postId,
        mentions: mention,
        notificationType: NotificationType.COMMENT,
        notificationTypeId: data?.createComment?.id,
      })
    }
    setText('')
    setErrors('')
    setImage('')
    setMentions([])
    setIsOpenSearchResult(false)
  }


  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2} justify='center'>
        <Grid item xs={12}>
          <TextField
            value={text}
            onChange={handleInputChange}
            error={errors ? true : false}
            type='text'
            label='Comment'
            variant='outlined'
            placeholder='Comment Something...'
            fullWidth
            required
            autoComplete='off'
          />
          {
            isOpenSearchResult && (
              <Paper elevation={3} sx={{ position: 'absolute', zIndex: 9999, ml: 20, px: 3, py: 1 }}>
                <Box sx={{ px: 3, py: 1 }}>
                  {
                    userList?.map(user => (
                      <Box key={user.id} sx={{ display: 'flex', justifyContent: 'space-between', py: .5 }}>
                        <Box sx={{ mr: 2 }}>
                          {user.image ? (
                            <img src={user.image} alt={'...'} style={{ width: 40, height: 40, borderRadius: 50 }} />
                          ) : <Avatar sx={{ width: 40, height: 40, mr: 0 }} />}
                        </Box>
                        <Typography sx={{ py: 1 }} onClick={(e) => startMention(e, user)}>{user.fullName}</Typography>
                      </Box>
                    ))
                  }
                </Box>
              </Paper>
            )
          }
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex' }}>
            <label htmlFor="commentImage">
              <input
                style={{ display: "none" }}
                id="commentImage"
                name="commentImage"
                type="file"
                accept="image/x-png,image/jpeg"
                onChange={handlePostImageUpload}
              />
              <Fab
                color="inherit"
                size="small"
                component="span"
                aria-label="add"
                variant="extended"
                sx={{ width: 60, height: 50, boxShadow: 'none' }}
                disableRipple={true}
                disableFocusRipple={true}
              >
                <IconSquarePlus />
              </Fab>
            </label>
            {
              image && (
                <Box sx={{ width: '100%', height: 40, display: 'flex', ml: 5, mt: 1 }}>
                  <img key={image.name} src={URL.createObjectURL(image)} alt="..." style={{ marginRight: 5, borderRadius: 5 }} />
                </Box>
              )
            }
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Button type='submit' variant='contained' color='primary' size='large' disabled={loading}>
            Create Comment
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default CommentCreate