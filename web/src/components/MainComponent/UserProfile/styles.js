import { createStyles, makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';

export const useStyles = makeStyles(theme => createStyles({
  root: {
    borderRadius: '12px',
    ...theme.typography.commonAvatar,
    transition: 'all .2s ease-in-out',
    background: theme.palette.primary.dark,
    color: theme.palette.background.paper,
    '&[aria-controls="menu-list-grow"],&:hover': {
      background: theme.palette.primary.light,
      color: theme.palette.primary.light,
    },
    display: 'flex',
    paddingBlock: 5,
    paddingInline: 10
  },
  coverImageComponent: {
    position: 'relative',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh - calc(100vh /1.5))',
    },
    height: 'calc(100vh - calc(100vh /2))',
  },
  imageOnlyDailog: {
    background: '#000',
  },
  imageOnlyDailogContent: {
    backgroundColor: '#000',
    minWidth: 230,
    width: '100%',
    height: 'calc(100vh - calc(100vh /5))',
    minHeight: 'calc(100vh - calc(100vh /3))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  renderProfileCover: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  coverImageBackground: {
    borderRadius: 10,
    height: '100%',
    background: theme.palette.primary.dark,
    overflow: 'hidden',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  coverImageBtn: {
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  userDetail: {
    maxWidth: '100%',
    padding: 0,
    position: 'relative',
  },
  userProfileGrid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImages: {
    shrink: 0,
    position: 'relative',
    borderRadius: '100%',
    overflow: 'hidden',
    border: ({ isUserOnline, auth, userId }) => `2px solid ${isUserOnline && auth?.id !== userId
      ? theme.palette.success.dark
      : 'dodgerblue'
      }`,
    [theme.breakpoints.only('xs')]: {
      width: 95,
    },
    width: 130,
  },
  profileRoot: {
    width: '100%',
    position: 'relative',
    cursor: 'pointer',
  },
  profileRootWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    '& > *': { height: '100%', width: '100%' },
  },
  profileImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center',
  },
  profileImageinputLabel: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    [theme.breakpoints.up('md')]: {
      right: 15,
      bottom: 12,
    },
    [theme.breakpoints.down('sm')]: {
      right: 5,
      bottom: 5,
    }
  },
  profileImageFab: {
    boxShadow: 'none',
    width: 35,
    height: 20,
    fontSize: 10,
    [theme.breakpoints.down('sm')]: {
      width: 33,
      padding: 0
    }
  },
  followCount: {
    fontSize: 16,
    color: theme.palette.background.paper
  },
  followTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0
  },

  followEditBtn: {
    ...theme.typography.commonAvatar,
    ...theme.typography.largeAvatar,
    transition: 'all .2s ease-in-out',
    background: theme.palette.primary.light,
    color: theme.palette.primary.dark,
    '&[aria-controls="menu-list-grow"],&:hover': {
      background: theme.palette.primary.dark,
      color: theme.palette.primary.light,
    },
    width: '50%',
    height: 32,
  },
  imageList: {
    width: '100%',
    height: '100%',
    cursor: 'pointer',
    transition: 'all .1s ease-in-out',
    borderRadius: 5,
    '&:hover': {
      padding: 2,
      background: theme.palette.primary.light
    },
  },
  imagePlus: {
    position: 'absolute',
    top: 5,
    right: 5,
    background: '#000',
    color: '#fff',
    borderRadius: 5,
    width: 25,
    height: 25,
    textAlign: 'center',
    paddingTop: 2,
    [theme.breakpoints.only('xs')]: {
      fontSize: 12,
      paddingTop: 4,
    }
  },
  photos: {
    boxShadow: 'none',
    background: theme.palette.primary.light,
    color: theme.palette.primary.dark,
    '&:hover': {
      color: theme.palette.secondary.dark,
      background: theme.palette.secondary.light,
    },
  }
}));

export const ListItemWrapper = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  background: theme.palette.background.paper,
  padding: 8,
  '&:hover': {
    background: theme.palette.secondary.light,
  },
  '& .MuiListItem-root': {
    padding: 0,
  },
}));
