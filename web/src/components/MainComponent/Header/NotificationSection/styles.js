import { createStyles, makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 350,
      minWidth: 300,
      py: 0,
      borderRadius: '10px',
      backgroundColor: theme.palette.background.paper,
      [theme.breakpoints.down('md')]: {
        minWidth: '100%',
        maxWidth: 330,
      },
      '& .MuiListItemSecondaryAction-root': {
        top: 25
      },
      '& .MuiDivider-root': {
        my: 0
      },
      '& .list-container': {
        pl: 7
      }

    }
  }),
);




export const textEllipsis = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: '2',
  WebkitBoxOrient: 'vertical',
}