import React from 'react';
import moment from 'moment'
import { IconDots } from '@tabler/icons';
import { useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Box, Typography, Avatar, Button, IconButton, Menu, MenuItem } from '@mui/material';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';
import reactStringReplace from 'react-string-replace';

import { CommentDelete, CommentUpdate, CommentLike, CommentWhoLike } from './index';

export default function Comments({ getPost }) {
  const navigate = useNavigate()
  const user = useSelector(state => state?.users?.user)
  return (
    <Box>
      {getPost?.comments?.map(comment => (
        <Box key={comment?.id} sx={{ border: 1, borderColor: '#ddd', borderRadius: 2, mb: .5, p: .5 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', pl: 1, pt: 1 }}>
            <Box sx={{ display: 'flex' }}>
              <Box sx={{ mr: 1 }}>
                <Avatar alt={comment?.author?.fullName?.charAt(0).toUpperCase()} src={comment?.author?.image} onClick={() => navigate(`/profile/${comment?.author?.id}`)} aria-label="recipe" sx={{ width: 35, height: 35, backgroundColor: '#fff', fontSize: 14, cursor: 'pointer', border: 2, ":hover": { borderColor: 'dodgerblue' } }} />
              </Box>
              <Box>
                <Box sx={{ ml: 1 }}>
                  <Typography variant="h5" color="black" sx={{ marginRight: 5, ":first-letter": { textTransform: 'capitalize' } }}>{comment?.author?.fullName}</Typography>
                  <Typography sx={{ pb: 1, display: 'flex' }} variant="subtitle1" color="grey" >
                    {reactStringReplace(comment?.comment, /@(\w+)/g, (match, i) => {
                      const onlyName = match.replace(/[@]/, ' ').trim()
                      const findUser = comment?.mentions?.find(user => user.fullName === onlyName)
                      const goTo = findUser?.userId !== undefined ? `/profile/${findUser?.userId}` : ' '
                      return (
                        <Link key={match + i} to={goTo} >
                          <Typography variant="subtitle1" sx={{ color: 'dodgerblue', textTransform: 'capitalize', px: .5, fontWeight: 'bold' }}>{match}</Typography>
                        </Link>
                      )
                    })}
                  </Typography>
                  {
                    comment?.image && (
                      <img src={comment?.image} alt={comment?.author?.fullName} style={{ width: "120px", height: "100px", borderRadius: 10 }} />
                    )
                  }
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <CommentLike comment={comment} author={getPost?.author} postId={getPost?.id} />
                  <IconButton disableRipple>
                    <Typography variant='subtitle2' color="gray">{moment.unix(comment?.createdAt).fromNow()}</Typography>
                  </IconButton>
                </Box>
              </Box>
            </Box>
            <Box>
              <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                  <Box>
                    {user?.id === comment?.author?.id ? (
                      <Box>
                        <Button sx={{ mt: -1 }} {...bindTrigger(popupState)}  >
                          <IconDots />
                        </Button>
                        <Menu {...bindMenu(popupState)}>
                          <Box>
                            <MenuItem >
                              <CommentUpdate post={getPost} commentId={comment?.id} />
                            </MenuItem>
                            <MenuItem >
                              <CommentDelete post={getPost} commentId={comment?.id} imagePublicId={comment?.imagePublicId} />
                            </MenuItem>
                          </Box>
                        </Menu>
                      </Box>
                    ) : (
                      <Box>
                        <Button sx={{ mt: -1 }}  {...bindTrigger(popupState)} >
                          <IconDots />
                        </Button>
                      </Box>
                    )}
                  </Box>
                )}
              </PopupState>
              <CommentWhoLike comment={comment} />
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}
