import { createStyles, makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      borderRadius: '12px',
      ...theme.typography.commonAvatar,
      width: '80px',
      height: '45px',
      transition: 'all .2s ease-in-out',
      background: theme.palette.primary.light,
      color: theme.palette.primary.dark,
      '&[aria-controls="menu-list-grow"],&:hover': {
        background: theme.palette.primary.dark,
        color: theme.palette.primary.light
      },
      display: 'block', mr: 1,
    },
  }),
);

export const ListItemWrapper = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  background: theme.palette.background.paper,
  padding: 8,
  '&:hover': {
    background: theme.palette.secondary.light
  },
  '& .MuiListItem-root': {
    padding: 0
  },
}));