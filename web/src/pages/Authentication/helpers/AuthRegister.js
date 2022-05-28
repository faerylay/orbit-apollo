import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { useTheme } from '@mui/material/styles';
import { Box, Button, Checkbox, Divider, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography, useMediaQuery } from '@mui/material';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// project imports
import { rememberLogin } from '../../../auth'
import { REGISTER } from '../../../graphql';
import { useInput } from '../../../hooks/hooks';
import { AnimateButton } from '../../../components/MainComponent';

import Google from '../../../assets/images/icons/social-google.svg';

const AuthRegister = ({ ...others }) => {
  const navigate = useNavigate()
  const [errors, setErrors] = useState('')

  const fullName = useInput()
  const email = useInput()
  const password = useInput()
  const confirmPassword = useInput()


  const [signUp, { loading }] = useMutation(REGISTER, {
    update() {
      rememberLogin()
      navigate('/')
      window.location.reload(false)
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].message);
    },
    variables: {
      input: {
        fullName: fullName.value,
        email: email.value,
        password: password.value,
        confirmPassword: confirmPassword.value
      }
    }
  })
  const handleSubmit = async (e) => {
    e.preventDefault()
    await signUp()
  }


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
              Sign up with Google
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
            <Typography variant="subtitle1">Sign up with Email address</Typography>
          </Box>
        </Grid>
      </Grid>


      <form noValidate onSubmit={handleSubmit} {...others}>
        <FormControl fullWidth error={Boolean(errors)} sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="outlined-adornment-fullName-login">Full Name</InputLabel>
          <OutlinedInput
            {...fullName}
            id="outlined-adornment-fullName-login"
            type="text"
            name="fullName"
            label="Full Name"
            inputProps={{}}
          />
          {errors && (
            <FormHelperText error id="standard-weight-helper-text-fullName-login">
              {errors}
            </FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth error={Boolean(errors)} sx={{ ...theme.typography.customInput }}>
          <InputLabel htmlFor="outlined-adornment-email-login">Email Address </InputLabel>
          <OutlinedInput
            {...email}
            id="outlined-adornment-email-login"
            type="email"
            name="email"
            label="Email Address "
            inputProps={{}}
          />
          {errors && (
            <FormHelperText error id="standard-weight-helper-text-email-login">
              {errors}
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

        <FormControl
          fullWidth
          error={Boolean(errors)}
          sx={{ ...theme.typography.customInput }}
        >
          <InputLabel htmlFor="outlined-adornment-confirmPassword-login">Confirm Password</InputLabel>
          <OutlinedInput
            {...confirmPassword}
            id="outlined-adornment-confirmPassword-login"
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
            <FormHelperText error id="standard-weight-helper-text-confirmPassword-login">
              {errors}
            </FormHelperText>
          )}
        </FormControl>

        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={(event) => setChecked(event.target.checked)}
                  name="checked"
                  color="primary"
                />
              }
              label={
                <Typography variant="subtitle1">
                  Agree with &nbsp;
                  <Typography variant="subtitle1" component={Link} to="#">
                    Terms & Condition.
                  </Typography>
                </Typography>
              }
            />
          </Grid>
        </Grid>
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
              Sign Up
            </Button>
          </AnimateButton>
        </Box>
      </form>
    </>
  );
};

export default AuthRegister;
