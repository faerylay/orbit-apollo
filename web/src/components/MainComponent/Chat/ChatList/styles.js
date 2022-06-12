import { createStyles, makeStyles } from '@mui/styles'

export const useStyles = makeStyles((theme) => createStyles({
  main__chatUsersList: {
    paddingInline: 10,
    boxShadow: '-3px 0 3px -4px #333',
    height: 'calc(100vh - calc(100vh /1.6))',
    minHeight: 'calc(100vh - calc(100vh /4))',
    maxHeight: 'calc(100vh - calc(100vh /5))',
    overflow: 'hidden',
  },
  chatlist__header: {
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
    maxHeight: 'calc(100vh - calc(100vh / 2))',
    overflow: 'auto',
    width: '100%',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  },
  chatlist__item: {
    width: '100%',
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
    "&:last-child": {
      marginBottom: 30
    },
    "&:hover": {
      background: theme.palette.secondary.light,
      borderRadius: 10,
    },
  },
  isOnline: {
    width: 11,
    height: 11,
    alignSelf: 'end',
    marginLeft: -10,
    zIndex: 99,
    background: '#ddd',
    borderRadius: '50%',
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
    display: 'flex',
    width: '20%',
    "& img": {
      maxWidth: '100%',
      borderRadius: 20,
      objectFit: 'cover',
    }
  },
  userMeta: {
    width: '58%',
    height: '100%',
    display: 'block'
  },
  userDate: {
    width: '22%',
    display: 'flex',
    flexDirection: 'column'
  }
}),
)

