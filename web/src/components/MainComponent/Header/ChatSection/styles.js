import { createStyles, makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => createStyles({
  buttonBaseStyle: {
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    transition: 'all .2s ease-in-out',
    background: theme.palette.secondary.light,
    color: theme.palette.secondary.dark,
    '&[aria-controls="menu-list-grow"],&:hover': {
      background: theme.palette.secondary.dark,
      color: theme.palette.secondary.light
    },
    overflow: 'visible'
  },
  listStyle: {
    width: '100%',
    maxWidth: 350,
    minWidth: 300,
    backgroundColor: theme.palette.background.paper,
    borderRadius: '10px',
    '& .MuiListItemButton-root': {
      mt: 0.5
    }
  },
  chat__item: {
    background: props => props.unseen ? theme.palette.secondary.light : '#fff',
    borderRadius: props => props.unseen ? 10 : 0,
    marginTop: 5,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    "&:first-child": {
      marginTop: 0
    },
    "&:hover": {
      background: theme.palette.secondary.light,
      borderRadius: 10,
    },
  },
}),
);

