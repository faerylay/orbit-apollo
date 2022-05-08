import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { TextField, Button, Box, Grid, Typography, Fab, IconButton } from '@mui/material';
import { IconSquarePlus, IconX } from '@tabler/icons';
import { UPDATE_POST, FETCH_POSTS_QUERY, ME, CREATE_POST_UPDATED_HISTORY, POST_UPDATED_HISTORIES } from '../../../graphql';
import { useModify } from '../../../hooks/hooks'
import { MAX_POST_IMAGE_SIZE } from '../../../constants'

export default function PostUpdating(props) {
  const navigate = useNavigate()
  const auth = useSelector(state => state?.users?.user)

  let title = useModify(props.title)
  let description = useModify(props.description)

  const [errors, setErrors] = useState('')
  const [image, setImage] = useState([]);

  useEffect(() => {
    const onImage = async (imgUrl) => {
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      const file = new File([blob], "image." + imgUrl.split(/[#?]/)[0]
        .split(".")
        .pop()
        .trim(), {
        type: blob.type,
      });
      return file
    }
    const fileArr = props?.image?.map(item => onImage(item))
    Promise.all(fileArr).then(result => setImage(result))
  }, [props?.image])


  const [updatePost, { loading }] = useMutation(UPDATE_POST, {
    onError(err) {
      setErrors(err.graphQLErrors[0].message);
    },
    variables: {
      input: {
        postId: props.postId,
        title: title.value,
        description: description.value,
        image,
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

    const file = e.target.files;
    if (!file) return;
    if (file.size >= MAX_POST_IMAGE_SIZE) {
      console.error(`File size should be less then ${MAX_POST_IMAGE_SIZE / 1000000}MB`);
      return;
    }
    setImage([...image, ...file]);
    e.target.value = null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await createPostUpdatedHistory()
    await updatePost()
    title = ''
    description = ''
    setImage([])
    setErrors('')
    navigate('/')
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
              <label htmlFor="postUpdateImage">
                <input
                  style={{ display: "none" }}
                  id="postUpdateImage"
                  name="postUpdateImage"
                  type="file"
                  multiple
                  accept="image/x-png,image/jpeg"
                  onChange={handlePostImageUpload}
                />
                <Fab
                  color="inherit"
                  size="small"
                  component="span"
                  aria-label="add"
                  variant="extended"
                  sx={{ width: 60, height: 40 }}
                  disableRipple={true}
                  disableFocusRipple={true}
                >
                  <IconSquarePlus />
                </Fab>
              </label>
              <Box sx={{ width: '100%', height: 50, display: 'flex', overflow: 'scroll', ml: 5 }}>
                {image.map((url, index) => (
                  <Box key={index.toString()} sx={{ display: 'flex' }} >
                    <IconButton onClick={() => setImage(image.filter(item => item !== url))} sx={{ position: 'absolute', background: 'red', borderRadius: 1 }}>
                      <IconX size={10} color="#fff" stroke={3} />
                    </IconButton>
                    <img src={URL.createObjectURL(url)} alt="..." style={{ borderRadius: 5, marginRight: 5, width: 100, height: 50 }} />
                  </Box>
                ))}
              </Box>
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
