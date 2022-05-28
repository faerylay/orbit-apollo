import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { TextField, Button, Box, Grid, Typography } from '@mui/material';

import { UPDATE_POST, FETCH_POSTS_QUERY, ME, CREATE_POST_UPDATED_HISTORY, POST_UPDATED_HISTORIES } from '../../../graphql';
import { useModify } from '../../../hooks/hooks'
import { MAX_POST_IMAGE_SIZE } from '../../../constants'

export default function PostUpdating(props) {
  const navigate = useNavigate()
  const auth = useSelector(state => state?.users?.user)
  const [errors, setErrors] = useState('')
  let title = useModify(props.title)
  let description = useModify(props.description)

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    if (selectedImage) {
      setImageUrl(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const [updatePost, { loading }] = useMutation(UPDATE_POST, {
    update(proxy, result) {
      setTimeout(() => navigate('/'), 100)
      // const data = proxy.readQuery({
      //   query: FETCH_POSTS_QUERY
      // })
      // proxy.writeQuery({
      //   query: FETCH_POSTS_QUERY,
      //   data: { getPosts: [...data.getPosts, result.data.updatePost] }
      // });
      title = ''
      description = ''
      setErrors('')
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].message);
    },
    variables: {
      input: {
        postId: props.postId,
        title: title.value,
        description: description.value,
        image: selectedImage,
        imagePublicId: props.imagePublicId
      }
    },
    refetchQueries: [
      { query: FETCH_POSTS_QUERY },
      { query: ME },
      { query: POST_UPDATED_HISTORIES, variables: { postId: props?.postId } },
    ]
  })

  const [createPostUpdatedHistory] = useMutation(CREATE_POST_UPDATED_HISTORY, {
    variables: {
      input: {
        userId: auth?.id,
        postId: props.postId,
        title: props.title,
        description: props.description,
        image: props.image ? props.image : null
      }
    }
  })
  const handlePostImageUpload = (e) => {

    const file = e.target.files[0];
    if (!file) return;
    if (file.size >= MAX_POST_IMAGE_SIZE) {
      console.error(`File size should be less then ${MAX_POST_IMAGE_SIZE / 1000000}MB`);
      return;
    }
    setSelectedImage(file)
    e.target.value = null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createPostUpdatedHistory()
    await updatePost()
  }


  return (
    <Box>
      {
        !!errors && (
          <Box sx={{ border: 0.5, borderColor: 'red', borderRadius: 2, padding: 1, mb: 2 }}>
            <Typography
              variant="body2"
              component="div"
              sx={{ textTransform: 'none' }}
            >
              {errors}
            </Typography>
          </Box>
        )
      }
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justify='center'>
          <Grid item xs={12}>
            <TextField
              {...title}
              error={errors ? true : false}
              type='text'
              label='Title'
              variant='outlined'
              placeholder='title...'
              fullWidth
              required
            />
            <TextField
              {...description}
              error={errors ? true : false}
              type='text'
              label='Description'
              variant='outlined'
              placeholder='description...'
              margin='normal'
              fullWidth
              required
            />
            <Box sx={{ display: 'flex' }}>
              <input
                accept="image/*"
                type="file"
                id="select-image"
                style={{ display: 'none' }}
                onChange={handlePostImageUpload}
              />
              <label htmlFor="select-image">
                <Button variant="outlined" color="secondary" component="span">
                  Upload Image
                </Button>
              </label>
              <img src={imageUrl ? imageUrl : props.image} alt={imageUrl ? imageUrl : props.image} height="40px" width="60px" style={{ padding: 3, borderRadius: 10 }} />
            </Box>

          </Grid>
          <Grid item xs={12}>
            <Button type='submit' variant='contained' color='primary' size='large' disabled={loading}>
              Update Post
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}
