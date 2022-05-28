import { createStyles, makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme) => createStyles({
  main__chatUsersList: {
    height: '100%',
    width: '100%',
    paddingInline: 10,
    boxShadow: '3px 0 3px -4px #333, -3px 0 3px -4px #333'
  },
  chatlist__heading: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBlock: 10,
  },
  btnNobg: {
    background: 'transparent',
    border: 'none',
    boxShadow: 'none',
    fontSize: 18,
    cursor: 'pointer',
    padding: 10,
    color: '#000',
    outline: 'none',
  },
  chatList__search: {
    paddingBottom: 10,
  },
  search_wrap: {
    background: '#e6e5ea',
    borderRadius: 5,
    "& input": {
      background: 'transparent',
      border: 'none',
      paddingInline: 15,
      paddingTop: 15,
      paddingBottom: 15,
      outline: 'none',
      width: '90%',
      paddingRight: 0,
    }
  },
  searchBtn: {
    height: 46,
    border: 'none',
    background: 'transparent',
    outline: 'none',
    width: '10%',
    cursor: 'pointer',
    fontSize: 20,
  },
  chatlist__items: {
    overflow: 'scroll',
    maxHeight: props => props ? 'calc(100vh - calc(100vh /2))' : 'calc(100vh - calc(100vh /3))',
    height: props => props ? 'calc(100vh - calc(100vh /2))' : 'calc(100vh - calc(100vh /3))',
    '&::-webkit-scrollbar': {
      width: '0.5em',
      display: 'none'
    },
    "&:hover": {
      '&::-webkit-scrollbar': {
        display: 'block'
      },
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
    },
  },
  chatlist__item: {
    display: 'flex',
    justifyContent: 'space-between',
    background: props => props.unseen ? theme.palette.secondary.light : '#fff',
    borderRadius: props => props.unseen ? 10 : 0,
    borderBottom: 1,
    borderColor: '#ebe7fb',
    marginTop: 5,
    cursor: 'pointer',
    padding: 10,
    transition: 'all 0.3s ease',
    transform: 'scale(0)',
    animationName: '$showIn',
    animationDuration: '0.2s',
    animationIterationCount: 1,
    animationDirection: 'normal',
    animationTimingFunction: 'ease-in-out',
    animationFillMode: 'both',
    animationDelay: 0.1,
    "&:first-child": {
      marginTop: 0
    },
    "&:hover": {
      background: theme.palette.secondary.light,
      borderRadius: 10,
    },
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
    background: 'lightgreen',
    borderRadius: 10,
  },
  "@keyframes showIn": {
    "0%": {
      transform: "scale(0)"
    },
    "100%": {
      transform: "scale(1)"
    },
  },
  avatar: {
    borderRadius: ' 50%',
    marginRight: 10,
    position: 'relative',
    width: 40,
    height: 40,
    "& img": {
      maxWidth: '100%',
      borderRadius: 20,
      objectFit: 'cover',
    }
  },
}),
)

