import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Drawer, Fab, Box, Grid, IconButton, Tooltip } from '@mui/material';
import { IconMessageCircle } from '@tabler/icons';


import { AnimateButton } from '../../MainComponent';
import { gridSpacing } from '../../../redux/reduxConstant';

const Chat = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen(!open);
  };
  return (
    <>
      <Tooltip title="Live Customize">
        <Fab
          component="div"
          onClick={handleToggle}
          size="medium"
          variant="circular"
          color="secondary"
          sx={{
            borderRadius: 0,
            borderTopLeftRadius: '50%',
            borderBottomLeftRadius: '50%',
            borderTopRightRadius: '50%',
            borderBottomRightRadius: '4px',
            top: '25%',
            position: 'fixed',
            right: 10,
            zIndex: theme.zIndex.speedDial
          }}
        >
          <AnimateButton>
            <IconButton color="inherit" size="large" disableRipple>
              <IconMessageCircle />
            </IconButton>
          </AnimateButton>
        </Fab>
      </Tooltip>

      <Drawer
        anchor="right"
        onClose={handleToggle}
        open={open}
        PaperProps={{
          sx: {
            width: 280
          }
        }}
      >
        <Box component="div">
          <Grid container spacing={gridSpacing} sx={{ p: 3 }}>
            <Grid item xs={12}>


            </Grid>
            <Grid item xs={12}>
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </>
  );
};

export default Chat;
