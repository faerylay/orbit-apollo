import { createStyles, makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => createStyles({
  chipStyle: {
    height: '48px',
    alignItems: 'center',
    borderRadius: '27px',
    transition: 'all .2s ease-in-out',
    borderColor: theme.palette.primary.light,
    backgroundColor: theme.palette.primary.light,
    '&[aria-controls="menu-list-grow"], &:hover': {
      borderColor: theme.palette.primary.main,
      background: `${theme.palette.primary.main}!important`,
      color: theme.palette.primary.light,
      '& svg': {
        stroke: theme.palette.primary.light
      }
    },
    '& .MuiChip-label': {
      lineHeight: 0
    }
  },
  avatarStyle: {
    ...theme.typography.mediumAvatar,
    margin: '8px 0 8px 8px !important',
    cursor: 'pointer'
  },
  list: {
    width: '100%',
    maxWidth: 350,
    minWidth: 300,
    backgroundColor: theme.palette.background.paper,
    borderRadius: '10px',
    [theme.breakpoints.down('md')]: {
      minWidth: '100%'
    },
    '& .MuiListItemButton-root': {
      mt: 0.5
    }
  }
}),
);

