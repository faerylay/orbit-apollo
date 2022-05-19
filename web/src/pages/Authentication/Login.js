import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles';
import { Grid, Divider, Stack, Typography, useMediaQuery } from '@mui/material';
import { AuthCardWrapper, AuthWrapper, AuthLogin } from './helpers';
import { isLoggedIn } from '../../auth';

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  useEffect(() => {
    //TODO: not error but don`t like it.because when cookie doesnt exist on browser then reload page 
    // and automatically go to login page and login form again . url pathname changing serveral time and go to home page 
    // i don`t like to change url serveral time 
    !isLoggedIn() && location.pathname !== '/login' && navigate('/login')
  }, [navigate, location]);

  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  return (
    <AuthWrapper>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item sx={{ mb: 3 }}>
                    {/* <Link to="#"></Link> */}
                    <Typography variant='h2' sx={{ color: theme.palette.primary.main }}>Orbit</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid
                      container
                      direction={matchDownSM ? 'column-reverse' : 'row'}
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={1}>
                          <Typography
                            color={theme.palette.secondary.main}
                            gutterBottom
                            variant={matchDownSM ? 'h3' : 'h2'}
                          >
                            Hi, Welcome Back
                          </Typography>
                          <Typography
                            variant="caption"
                            fontSize="16px"
                            textAlign={matchDownSM ? 'center' : 'inherit'}
                          >
                            Enter your credentials to continue
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthLogin />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item container direction="column" alignItems="center" xs={12}>
                      <Typography
                        component={Link}
                        to="/register"
                        variant="subtitle1"
                        sx={{ textDecoration: 'none' }}
                      >
                        Don&apos;t have an account?
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid> */}
      </Grid>
    </AuthWrapper>
  );
}
