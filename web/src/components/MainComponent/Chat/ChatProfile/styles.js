import { createStyles, makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import { Switch } from '@mui/material';
// const conditionCheck = props => props.users?.sender?.id !== props?.sender

export const useStyles = makeStyles((theme) => createStyles({
  chatProfile__main: {
    paddingInline: 3,
    maxHeight: 'calc(100vh - calc(100vh / 7))',
    overflow: 'auto',
    '&::-webkit-scrollbar': {
      width: '0.6em',
      display: 'none'
    },
    "&:hover": {
      '&::-webkit-scrollbar': {
        display: 'block'
      },
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: 'rgba(220,220,220,.1)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
    },
  },
  profile__title: {
    padding: 10
  },
  profile__header: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    background: theme.palette.grey[50],
    paddingBlock: 10,
  },
  profile__detail: {
    display: 'flex',
    flexDirection: 'column',
  },
  profile__image: {
    alignSelf: 'center',
    paddingBlock: 20,
  },
  profile__avatar: {
    width: 66,
    height: 66
  },
  profile__text: {
    alignSelf: 'center',
    paddingBlock: 2
  },
  profile__logos: {
    paddingBlock: 20,
    display: 'flex',
    justifyContent: 'center'
  },
  chatProfile__footer: {

  }

}),
)

export const IOSSwitch = styled((props) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : theme.palette.primary.dark,
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));