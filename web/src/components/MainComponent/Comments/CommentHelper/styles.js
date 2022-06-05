import { Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { shouldForwardProp } from '@mui/system';

export const editorStyle = {
  boxSizing: 'border-box',
  border: 1,
  borderColor: '#ddd',
  cursor: 'text',
  borderRadius: 2,
  background: '#fefefe',
  padding: 1,
  marginBottom: 2,
}
export const HeaderAvatarStyle = styled(Avatar, { shouldForwardProp })(({ theme }) => ({
  ...theme.typography.commonAvatar,
  ...theme.typography.smallAvatar,
  background: theme.palette.secondary.light,
  color: theme.palette.secondary.dark,
  '&:hover': {
    background: theme.palette.secondary.dark,
    color: theme.palette.secondary.light
  }
}));
