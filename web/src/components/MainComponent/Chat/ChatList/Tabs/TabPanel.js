import React from 'react'
import { Box } from '@mui/material'

export default function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Box
      sx={{ width: '100%', height: '100%' }}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </Box>
  );
}
