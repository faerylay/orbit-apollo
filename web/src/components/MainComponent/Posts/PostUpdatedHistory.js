import React from 'react'
import moment from 'moment';
import { Box, Modal, Typography, Card, CardMedia, CardHeader, Avatar, CardContent, } from '@mui/material';
import { postEdit } from './styles'

const PostUpdatedHistory = ({ data, closeMenu }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    closeMenu.close()
    setOpen(false)
  };

  return (
    <>
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
              <Card key={post.id} sx={{ border: 1, borderColor: '#eaeaea', mb: 1 }}>
                <CardHeader avatar={
                  <Avatar alt={post.user.fullName?.charAt(0).toUpperCase()} src={post?.user?.image} aria-label="recipe" sx={{ border: 2 }} />
                }
                  title={post.user.fullName}
                  subheader={moment.unix(post.createdAt).fromNow()}
                />
                {
                  post.image.map((img, index) => (
                    <CardMedia key={index.toString()} component="img" image={img} alt={img} />
                  ))
                }

                <CardContent>
                  <Typography variant="h6" color="black">{post.title}</Typography>
                  <Typography variant="body2" color="text.secondary"> {post.description}</Typography>
                </CardContent>
              </Card>
            ))
          }
        </Box>
      </Modal>
    </>
  )
}
export default PostUpdatedHistory