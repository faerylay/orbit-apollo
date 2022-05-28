import React from 'react'
import { CardMedia, Box } from '@mui/material';

const CardMedias = ({ image }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      {
        image.map(img => (
          <Box key={img.toString()} sx={{ p: img ? 2 : null }}>
            <CardMedia
              component="img"
              sx={{ width: '100%', height: 150 }}
              image={img}
              alt={img}
            />
          </Box>
        ))
      }
    </Box>
  )
}
export default CardMedias