import React from 'react'
import { useTheme } from '@mui/material/styles';
import { ButtonBase, InputAdornment, } from '@mui/material';
import { IconAdjustmentsHorizontal, IconSearch } from '@tabler/icons';
import { OutlineInputStyle, HeaderAvatarStyle } from './styles';

const SearchInput = ({ onChange, onFocus, value, inputRef, children, }) => {
  const theme = useTheme();
  return (
    <>
      <OutlineInputStyle
        autoComplete='off'
        sx={{ height: 40 }}
        onChange={onChange}
        onFocus={onFocus}
        value={value}
        ref={inputRef}
        type="text"
        id="input-search-header"
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
                <IconAdjustmentsHorizontal stroke={1.5} size="1rem" />
              </HeaderAvatarStyle>
            </ButtonBase>
          </InputAdornment>
        }
        aria-describedby="search-helper-text"
        inputProps={{ 'aria-label': 'weight' }}
      />
      {children}
    </>
  )
}
export default SearchInput