import React from 'react';
import { IconButton } from '@mui/material';
import { MoreHoriz } from '@mui/icons-material';
import { useSelector } from 'react-redux'
import useNotifications from '../../../../hooks/useNotifications'

const NotificationMenu = ({ noti }) => {
  const auth = useSelector(state => state?.users?.user)
  const notification = useNotifications()

  const deleteNoti = async () => {
    if (auth?.id !== noti?.author?.id) {
      await notification.remove({
        notificationId: noti.id
      })
    }
  }
  return (
    <IconButton onClick={deleteNoti}>
      <MoreHoriz />
    </IconButton>
  )
}

export default NotificationMenu