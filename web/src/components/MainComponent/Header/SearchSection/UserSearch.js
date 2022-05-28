import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { IconSearch } from '@tabler/icons';
import { Box, ButtonBase, Card, Grid, Typography } from '@mui/material';
import PopupState, { bindPopper, bindToggle } from 'material-ui-popup-state';

import { useApolloClient } from '@apollo/client';
import { SEARCH_USERS } from '../../../../graphql'

import Transitions from '../../../MainComponent/extended/Transitions';
import { HeaderAvatarStyle, PopperStyle } from './Styles';

import useClickOutside from '../../../../hooks/useClickOutSide'
import useDebounce from '../../../../hooks/useDebounce'

import MobileSearch from './MobileSearch'
import SearchInput from './SearchInput';
import SearchResult from './SearchResult';


const UserSearch = () => {
  const theme = useTheme();
  const client = useApolloClient();
  const [isOpenSearchResult, setIsOpenSearchResult] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Close search result on click outside
  const inputRef = useRef(null);
  useClickOutside(inputRef, () => setIsOpenSearchResult(false));

  // Debounce search query value
  const debounceSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    // Clear search input value, after location change
    setSearchQuery('');
  }, []);

  useEffect(() => {
    const search = async () => {
      const { data } = await client.query({
        query: SEARCH_USERS,
        variables: { searchQuery: debounceSearchQuery },
      });

      setUsers(data.searchUsers);
      setLoading(false);

      const openSearchResult = debounceSearchQuery !== '';
      setIsOpenSearchResult(openSearchResult);
    };

    debounceSearchQuery ? search() : setIsOpenSearchResult(false);

    return () => setLoading(false);
  }, [debounceSearchQuery, client]);

  const handleInputChange = async (e) => {
    // Trim white space only from beginning
    const value = e.target.value.replace(/^\s+/g, '');
    setSearchQuery(value);
    if (value) {
      setLoading(true);
    }
  };

  const handleInputFocus = () => searchQuery && setIsOpenSearchResult(true);


  return (
    <>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <PopupState variant="popper" popupId="demo-popup-popper">
          {(popupState) => (
            <>
              <Box sx={{ ml: 2 }}>
                <ButtonBase sx={{ borderRadius: '12px' }}>
                  <HeaderAvatarStyle variant="rounded" {...bindToggle(popupState)}>
                    <IconSearch stroke={1.5} size="1.2rem" />
                  </HeaderAvatarStyle>
                </ButtonBase>
              </Box>
              <PopperStyle {...bindPopper(popupState)} transition>
                {({ TransitionProps }) => (
                  <>
                    <Transitions type="zoom" {...TransitionProps} sx={{ transformOrigin: 'center left' }}>
                      <Card
                        sx={{
                          background: '#fff',
                          [theme.breakpoints.down('sm')]: {
                            border: 0,
                            boxShadow: 'none'
                          }
                        }}
                      >
                        <Box sx={{ p: 2 }} >
                          <Grid container alignItems="center" justifyContent="space-between">
                            <Grid item xs>
                              <MobileSearch
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                                value={searchQuery}
                                inputRef={inputRef}
                                popupState={popupState}
                              >
                                {loading && <Typography>Loading...</Typography>}

                                {isOpenSearchResult && <SearchResult users={users} />}
                              </MobileSearch>

                            </Grid>
                          </Grid>
                        </Box>
                      </Card>
                    </Transitions>
                  </>
                )}
              </PopperStyle>
            </>
          )}
        </PopupState>
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <SearchInput
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          value={searchQuery}
          inputRef={inputRef}
        >
          {isOpenSearchResult && <SearchResult users={users} loading={loading} />}
        </SearchInput>
      </Box>
    </>
  );
};

export default UserSearch;
