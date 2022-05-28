import { Avatar, OutlinedInput, Popper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { shouldForwardProp } from '@mui/system';

export const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
  width: 434,
  marginLeft: 16,
  paddingLeft: 16,
  paddingRight: 16,
  '& input': {
    background: 'transparent !important',
    paddingLeft: '4px !important'
  },
  [theme.breakpoints.down('lg')]: {
    width: 250
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: 4,
    background: '#fff'
  },
}));

export const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(({ theme }) => ({
  ...theme.typography.commonAvatar,
  ...theme.typography.smallAvatar,
  background: theme.palette.secondary.light,
  color: theme.palette.secondary.dark,
  '&:hover': {
    background: theme.palette.secondary.dark,
    color: theme.palette.secondary.light
  }
}));

export const PopperStyle = styled(Popper, { shouldForwardProp })(({ theme }) => ({
  zIndex: 1100,
  width: '99%',
  top: '-50px !important',
  padding: '0 12px',
  [theme.breakpoints.down('sm')]: {
    padding: '0 10px'
  }
}));

export const searchBox = {
  position: 'absolute',
  width: 340,
  height: 300,
  backgroundColor: '#fff',
  marginLeft: 7,
  px: 2,
  marginTop: 1,
  overflowY: 'scroll'
}

export const searchResultList = {
  borderRadius: 1,
  cursor: 'pointer',
  p: 1,
  py: 1.5,
  ':hover': {
    backgroundColor: '#eee'
  },
}