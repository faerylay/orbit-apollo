import React from 'react'
import { Dialog, DialogContent } from '@mui/material'

const MakeDialogOpen = ({ children, open, close }) => {
  return (
    <Dialog fullWidth={true} maxWidth={'md'} scroll='paper' open={open} onClose={close}>
      <DialogContent sx={{ padding: 0, margin: 0, overflow: 'hidden' }}>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default MakeDialogOpen