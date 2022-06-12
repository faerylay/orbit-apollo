import { createStyles, makeStyles } from '@mui/styles';

const conditionCheck = props => props.users?.sender?.id !== props?.sender

export const useStyles = makeStyles((theme) => createStyles({
  main__chatcontent: {
    flexGrow: 1,
    padding: 0,
    boxShadow: '3px 0 3px -4px #333, -3px 0 3px -4px #333',
  },
  content__header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 2px -2px #eee',
    padding: 10
  },
  current_chatting_user: {
    display: 'flex',
    alignItems: 'center',
    "& p": {
      margin: 0,
      fontWeight: 600
    }
  },
  content__body: {
    maxHeight: 'calc(100vh - calc(100vh / 2))',
    overflow: 'auto',
    paddingInline: 10,
    '&::-webkit-scrollbar': {
      width: '0.4em',
      display: 'block'
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'rgba(220,220,220,.1)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
    },
  },
  chat__item: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 15,
    transition: 'all 0.3s ease',
    transform: 'scale(0)',
    transformOrigin: 'right',
    animationName: '$showIn',
    animationDuration: '0.2s',
    animationIterationCount: 1,
    animationDirection: 'normal',
    animationTimingFunction: 'ease-in-out',
    animationFillMode: 'both',
    animationDelay: 0.2,
    paddingTop: 10
  },
  "@keyframes showIn": {
    "0%": {
      transform: "scale(0)"
    },
    "100%": {
      transform: "scale(1)"
    }
  },
  avatar: {
    marginRight: props => conditionCheck(props) ? 5 : 0,
    marginLeft: props => conditionCheck(props) ? 0 : 5,
    background: '#fff',
    padding: 1,
    width: 40,
    height: 40,
    "& img": {
      width: 40,
      height: 40,
      borderRadius: 20,
    }
  },
  avatarImg: {
    background: '#fff',
    marginRight: 10,
    padding: 1,
    width: 40,
    height: 40,
    "& img": {
      width: 40,
      height: 40,
    }
  },
  chat__item__content: {
    padding: 15,
    maxWidth: '50%',
    minWidth: 215,
    background: props => conditionCheck(props) ? '#f1f1f1' : '#3b5bfe',
    color: props => conditionCheck(props) ? '#000' : '#fff',
    borderRadius: 10,
    borderTopLeftRadius: props => conditionCheck(props) ? 0 : 10,
    borderBottomRightRadius: props => conditionCheck(props) ? 10 : 0
  },
  chat__item__menu: {
    marginInline: -5
  },
  isOnline: {
    background: 'red',
  },
  chat__meta: {
    userSelect: 'none',
  },
  chat__msg: {
    fontSize: 15,
    color: props => conditionCheck(props) ? '#555' : "#eee",
    userSelect: 'none',
  },
  chat__time: {
    color: "#777",
    fontSize: 10,
    position: 'absolute',
    bottom: -15,
  },
  other: {
    flexDirection: props => conditionCheck(props) ? 'row-reverse' : 'row',
    transformOrigin: props => conditionCheck(props) ? 'left' : 'right'
  },
  content__footer: {
    display: 'flex',
    justifyXontent: 'space-between',
    padding: 10,
    borderRadius: 8,
    alignContent: 'center',
    alignItems: 'center',
    "& input": {
      flexGrow: 1,
      paddingTop: 0,
      paddingBottom: 0,
      paddingInline: 15,
      backgroundColor: theme.palette.secondary.light,
      border: 'none',
      outline: 'none',
      height: 42,
      width: '100%'
    }
  },
  formControl: {
    width: '100%',
    display: 'flex'
  },
  btnSendMsg: {
    backgroundColor: '#3b5bfe',
    borderRadius: 5,
    marginLeft: 5,
    color: '#fff',
    width: 42,
    height: 42,
  },
  inputBtn: {
    width: 42,
    height: 42,
    backgroundColor: '#ecefff',
    border: 'none',
    boxShadow: 'none',
    outline: 'none',
    cursor: 'pointer',
    fontSize: 16,
    color: '#4665ff',
    padding: 0,
    marginRight: 5,
    borderRadius: 5,
    lineHeight: 42,
    transition: ' all 0.3s cubic-bezier(0.88, 0.19, 0.37, 1.11)',
    "&:hover": {
      transform: 'scale(1.2)'
    },
    "& i": {
      display: 'block'
    }
  },

}),
)

