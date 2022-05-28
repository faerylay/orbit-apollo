import React from 'react'
import { useTheme } from '@mui/material/styles';
import { bindToggle } from 'material-ui-popup-state';
import { Avatar, Box, ButtonBase, InputAdornment } from '@mui/material';
import { IconAdjustmentsHorizontal, IconSearch, IconX } from '@tabler/icons';
import { OutlineInputStyle, HeaderAvatarStyle } from './styles';

const MobileSearch = ({ onChange, onFocus, value, inputRef, children, popupState }) => {
  const theme = useTheme();

  return (
    <>
      <OutlineInputStyle
        autoComplete='off'
        id="input-search-header"
        onChange={onChange}
        onFocus={onFocus}
        value={value}
        ref={inputRef}
        placeholder="Search"
        startAdornment={
          <InputAdornment position="start">
            <IconSearch stroke={1.5} size="1rem" color={theme.palette.grey[500]} />
          </InputAdornment>
        }
        endAdornment={
          <InputAdornment position="end">
            <ButtonBase sx={{ borderRadius: '12px' }}>
              <HeaderAvatarStyle variant="rounded">
                <IconAdjustmentsHorizontal stroke={1.5} size="1.3rem" />
              </HeaderAvatarStyle>
            </ButtonBase>
            <Box sx={{ ml: 2 }}>
              <ButtonBase sx={{ borderRadius: '12px' }}>
                <Avatar
                  variant="rounded"
                  sx={{
                    ...theme.typography.commonAvatar,
                    ...theme.typography.mediumAvatar,
                    background: theme.palette.orange.light,
                    color: theme.palette.orange.dark,
                    '&:hover': {
                      background: theme.palette.orange.dark,
                      color: theme.palette.orange.light
                    }
                  }}
                  {...bindToggle(popupState)}
                >
                  <IconX stroke={1.5} size="1.3rem" />
                </Avatar>
              </ButtonBase>
            </Box>
          </InputAdornment>
        }
        aria-describedby="search-helper-text"
        inputProps={{ 'aria-label': 'weight' }}
      />
      {children}
    </>

  );
};
export default MobileSearch