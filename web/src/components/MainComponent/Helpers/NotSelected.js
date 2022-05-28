import React from 'react'
import { Grid, Typography, useTheme } from '@mui/material';

const NotSelected = () => {
  const theme = useTheme()
  return (
    <Grid item md={7} lg={9} sx={{ [theme.breakpoints.down('sm')]: { display: 'none' }, textAlign: 'center', margin: 'auto' }}>
      <Typography>Not Selected</Typography>
    </Grid>
  )
}

export default NotSelected