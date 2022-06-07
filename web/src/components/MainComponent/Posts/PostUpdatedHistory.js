import React from 'react'
import moment from 'moment';
import Carousel from 'react-material-ui-carousel'
import { Box, Modal, Typography, Card, CardMedia, CardHeader, Avatar, CardContent, } from '@mui/material';
import { postEdit } from './styles'
import { POST_UPDATED_HISTORIES } from '../../../graphql';
import { useQuery } from '@apollo/client';

const PostUpdatedHistory = ({ postId, closeMenu }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    closeMenu.close()
    setOpen(false)
  };
  const { data, loading, error } = useQuery(POST_UPDATED_HISTORIES, {
    variables: { postId },
  })
  if (error) return 'something wrong';

  const renderContent = () => {
    return (
      <Box>
        <Typography onClick={handleOpen}> Edit history</Typography>
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={postEdit}>
            <Typography variant="h4" sx={{ py: 1 }}>View Edited history</Typography>
            {
              data?.postupdatedhistorys?.map(post => (
                <Card key={post.id} sx={{ border: 1, borderColor: '#eaeaea', mb: 1, boxShadow: 1 }}>
                  <CardHeader avatar={
                    <Avatar alt={post.user.fullName?.charAt(0).toUpperCase()} src={post?.user?.image} aria-label="recipe" sx={{ border: 2 }} />
                  }
                    title={post.user.fullName}
                    subheader={moment.unix(post.createdAt).fromNow()}
                  />
                  <Carousel indicators={false} swipe={false} slide={true} autoPlay={false} >
                    {
                      !loading && post?.image?.map((img, index) => (
                        <CardMedia key={index.toString()} component="img" image={img} alt={'...'} />
                      ))
                    }
                  </Carousel>
                  <CardContent>
                    <Typography variant="h6" color="black">{post.title}</Typography>
                    <Typography variant="body2" color="text.secondary"> {post.description}</Typography>
                  </CardContent>
                </Card>
              ))
            }
          </Box>
        </Modal>
      </Box>
    )
  }
  return (
    <Box>
      {
        !loading && !error && data?.postupdatedhistorys.length !== 0 ? renderContent() : 'Not Updated Yet'
      }
    </Box>
  )
}
export default PostUpdatedHistory