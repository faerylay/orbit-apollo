import React from 'react';
import { Link } from 'react-router-dom'
import { Box, Typography, Paper } from '@mui/material';

const NotFound = ({ message, showHomePageLink }) => {
  const loaded = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1000)
  }
  return (
    <Paper sx={{ py: 5, textAlign: 'center', mb: 2 }}>
      <Box onClick={loaded}>
        <Typography variant='subtitle1' sx={{ pb: 1 }}>{message}</Typography>
        {showHomePageLink && <Link to={showHomePageLink} style={{ textDecoration: 'none', color: 'dodgerblue' }}>Go back to Home Page</Link>}
      </Box>
    </Paper>
  );
}

NotFound.defaultProps = {
  message: "We can't seem to find the page you're looking for.",
  showHomePageLink: true,
};

export default NotFound;
