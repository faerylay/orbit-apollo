import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { ButtonBase, Typography } from '@mui/material';


const LogoSection = () => {
  const theme = useTheme();
  return (
    <ButtonBase disableRipple component={Link} to='/'>
      <Typography variant="h2" component='div' color={theme.palette.grey[900]}>Orbit</Typography>
    </ButtonBase>
  )
}

export default LogoSection;
