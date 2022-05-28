import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { useTheme } from '@mui/material/styles';
import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, Typography, useMediaQuery } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// project imports
import { rememberLogin } from '../../../auth'
import { LOG_IN } from '../../../graphql';
import { useInput } from '../../../hooks/hooks';
import { AnimateButton } from '../../../components/MainComponent';

// assets
import Google from '../../../assets/images/icons/social-google.svg';

const AuthLogin = ({ ...others }) => {
  const email = useInput()
  const password = useInput()
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const customization = useSelector((state) => state.customization);
  const [checked, setChecked] = useState(true);

  const googleHandler = async () => {
    console.error('Login');
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [errors, setErrors] = useState('')
  const navigate = useNavigate();
  const [logIn, { loading }] = useMutation(LOG_IN, {
    update() {
      rememberLogin()
      navigate('/')
      window.location.reload(false)
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].message);
    },
    variables: {
      email: email.value,
      password: password.value
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    await logIn()
  }

  return (
    <>
      <Grid container direction="column" justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <AnimateButton>
            <Button
              disableElevation
              fullWidth
              onClick={googleHandler}
              size="large"
              variant="outlined"
              sx={{
                color: 'grey.700',
                backgroundColor: theme.palette.grey[50],
                borderColor: theme.palette.grey[100]
              }}
            >
              <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
                <img src={Google} alt="google" width={16} height={16} style={{ marginRight: matchDownSM ? 8 : 16 }} />
              </Box>
              Sign in with Google
            </Button>
          </AnimateButton>
        </Grid>
        <Grid item xs={12}>
          <Box
            sx={{
              alignItems: 'center',
              display: 'flex'
            }}
          >
            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

            <Button
              variant="outlined"
              sx={{
                cursor: 'unset',
                m: 2,
                py: 0.5,
                px: 7,
                borderColor: `${theme.palette.grey[100]} !important`,
                color: `${theme.palette.grey[900]}!important`,
                fontWeight: 500,
                borderRadius: `${customization.borderRadius}px`
              }}
              disableRipple
              disabled
            >
              OR
            </Button>

            <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
          </Box>
        </Grid>
        <Grid item xs={12} container alignItems="center" justifyContent="center">
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1">Sign in with Email address</Typography>
          </Box>
        </Grid>
      </Grid>


      <form noValidate onSubmit={handleSubmit} {...others}>
        <FormControl fullWidth error={Boolean(errors)} sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="outlined-adornment-email-login">Email Address / Username</InputLabel>
          <OutlinedInput
            {...email}
            id="outlined-adornment-email-login"
            type="email"
            name="email"
            label="Email Address / Username"
            inputProps={{}}
          />
          {errors.email && (
            <FormHelperText error id="standard-weight-helper-text-email-login">
              {errors.email}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl
          fullWidth
          error={Boolean(errors)}
          sx={{ ...theme.typography.customInput }}
        >
          <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
          <OutlinedInput
            {...password}
            id="outlined-adornment-password-login"
            type={showPassword ? 'text' : 'password'}
            name="password"
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  size="large"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            inputProps={{}}
          />
          {errors && (
            <FormHelperText error id="standard-weight-helper-text-password-login">
              {errors}
            </FormHelperText>
          )}
        </FormControl>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={(event) => setChecked(event.target.checked)}
                name="checked"
                color="primary"
              />
            }
            label="Remember me"
          />
          <Typography variant="subtitle1" color="secondary" sx={{ textDecoration: 'none', cursor: 'pointer' }}>
            Forgot Password?
          </Typography>
        </Stack>
        {errors.submit && (
          <Box sx={{ mt: 3 }}>
            <FormHelperText error>{errors.submit}</FormHelperText>
          </Box>
        )}

        <Box sx={{ mt: 2 }}>
          <AnimateButton>
            <Button
              disableElevation
              disabled={loading}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="secondary"
            >
              Sign in
            </Button>
          </AnimateButton>
        </Box>
      </form>
    </>
  );
};

export default AuthLogin;
