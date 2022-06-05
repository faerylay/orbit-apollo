import { createStyles, makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme) => createStyles({
  buttonBaseStyle: {
    ...theme.typography.commonAvatar,
    ...theme.typography.smallAvatar,
    transition: 'all .2s ease-in-out',
    color: theme.palette.secondary.dark,
    '&[aria-controls="menu-list-grow"],&:hover': {
      background: theme.palette.secondary.dark,
      color: theme.palette.secondary.light
    },
    overflow: 'visible'
  },
  btnBase: {
    borderRadius: '12px',
    paddingTop: 3,
    paddingRight: 7
  },
  chatlist__items: {
    overflow: 'scroll',
  },
  chatlist__item: {
    display: 'flex',
    paddingBlock: 3,
    marginBottom: 3
  },
  isOnline: {
    position: 'absolute',
    width: 10,
    height: 10,
    bottom: 0,
    right: 0,
    background: '#ddd',
    borderRadius: '50%',
    borderColor: '#fff'
  },
  active: {
    position: 'absolute',
    width: 10,
    height: 10,
    bottom: 0,
    right: 0,
    background: 'lightgreen',
    borderRadius: '50%',
    borderColor: '#fff'
  },
  avatar: {
    borderRadius: '50%',
    marginRight: 15,
    position: 'relative',
    width: 40,
    height: 40,
    alignSelf: 'center',
    "& img": {
      maxWidth: '100%',
      borderRadius: 20,
      objectFit: 'cover',
    }
  },
}),
)

