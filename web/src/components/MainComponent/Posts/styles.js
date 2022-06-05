import { createStyles, makeStyles } from '@mui/styles'
import { OutlinedInput } from '@mui/material';
import { styled } from '@mui/material/styles';
import { shouldForwardProp } from '@mui/system';

export const useStyles = makeStyles((theme) => createStyles({
  dialogBox: {
    width: '100%',
    height: 'calc(100vh - calc(100vh /12))',
    display: 'flex',
    overflow: 'hidden',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
    }
  },
  postDialogImage: {
    width: '50%',
    height: '100%',
    background: '#000',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '54%',
    }
  },
  postDialogDetail: {
    width: '50%',
    height: '100%',
    overflowY: 'scroll',

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '46%',
    }
  },
  renderImages: {
    width: '100%',
    position: 'absolute',
    top: ' 50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  postDialogHeader: {
    width: '100%',
    height: '7%',
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      height: '15%',
    }
  },
  postDialogHeaderPersonal: {
    paddingBlock: 8,
    paddingLeft: 20,
    display: 'flex',
    alignItems: 'center',
    "& img": {
      width: 35,
      height: 35,
      borderRadius: 30,
    },
    "& p": {
      paddingLeft: 10,
      fontSize: 13
    },
    [theme.breakpoints.down('sm')]: {
      "& img": {
        width: 28,
        height: 28,
        borderRadius: 30,
      },
    }
  },
  postDialogHeaderMenu: {
    display: 'flex',
    alignItems: 'center',
    paddingRight: 10
  },
  postDialogBody: {
    width: '100%',
    height: 'auto',
    [theme.breakpoints.down('sm')]: {
      height: '55%',
    }
  },
  postDialogFooter: {
    width: '100%',
    height: '13%',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '30%',
    },
  }
}),
)
export const OutlineInputStyle = styled(OutlinedInput, { shouldForwardProp })(({ theme }) => ({
  width: '90%',
  height: '100%',
  paddingLeft: 16,
  paddingRight: 16,
  borderRadius: 0,
  '& input': {
    background: 'transparent !important',
    paddingLeft: '4px !important'
  }
}));

export const postEdit = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 500,
  overflow: 'scroll',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
  borderRadius: 3
};


export const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: .5,
  borderRadius: 3
};
