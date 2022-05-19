import React from 'react'
import { Card, CardHeader, CardContent, CardActions, Box, Skeleton } from '@mui/material';

const Skeletons = ({ count, cardContent, cardActions, paddingTop }) => {
  const loopSkeleton = () => {
    let skeleton = [];
    for (let i = 0; i < count; i++) {
      skeleton.push(
        <Card sx={{ mb: 1, py: paddingTop }} key={i}>
          <CardHeader avatar={<Skeleton variant="circular" width={40} height={40} />}
            title={<Skeleton height={20} variant="text" width="60%" style={{ marginBottom: 6 }} />}
            subheader={<Skeleton height={15} variant="text" width="20%" />}
          />
          {
            cardContent && (
              <CardContent>
                <Skeleton sx={{ height: 40 }} variant="rectangular" />
              </CardContent>
            )
          }
          {
            cardActions && (
              <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center' }}>
                  <Skeleton variant="text" width={80} height={40} />
                </Box>
                <Box sx={{ display: 'flex', textAlign: 'center', alignItems: 'center' }} >
                  <Skeleton variant="text" width={80} height={40} />
                </Box>
              </CardActions>
            )
          }
        </Card>
      );
    }
    return skeleton;
  };

  return loopSkeleton();
}
export default Skeletons