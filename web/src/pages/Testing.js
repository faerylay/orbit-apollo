import React, { useState, useRef } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { useQuery } from '@apollo/client';
import { FETCH_ALL_USERS } from '../graphql';


const Testing = () => {
  const scrollRef = useRef(null)
  const itemRef = useRef(null)
  const indicatorRef = useRef(null)
  const [activeSlide, setActiveSlide] = useState(0)

  const { data: { getUsers } = {} } = useQuery(FETCH_ALL_USERS, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first"
  });

  const scroll = () => {
    const scrollLeft = scrollRef.current.scrollLeft
    setActiveSlide(scrollLeft > 99 ? Number(String(scrollLeft / 2)[0]) : setActiveSlide(1))
  };

  const Indicator = () => {
    const loopIndicator = () => {
      let indicator = [];
      for (let i = 0; i < getUsers?.length; i++) {
        indicator.push(
          <Box
            ref={indicatorRef}
            onClick={() => {
              scrollRef.current.scrollLeft = i * itemRef.current.clientWidth;
              setActiveSlide(i)
            }}
            key={i}
            sx={{
              ml: .5,
              "&:first-of-type": { ml: 2 },
              mt: 2,
              width: 15,
              height: 15,
              borderRadius: 15,
              background: i === activeSlide ? 'dodgerblue' : 'silver'
            }}
          />
        );
      }
      return indicator;
    };
    return loopIndicator();
  }

  return (
    <Paper sx={{
      position: 'relative',
      display: 'block',
      overflowX: 'auto',
      width: '100%',
      maxWidth: '100vw',
      height: 300,
      maxHeight: '100%',
      background: '#e1e1e1',
      mb: 2,

    }} >
      <Box ref={scrollRef} onScroll={scroll} sx={{
        mt: 1,
        display: 'grid',
        gridGap: 'calc(20px / 2)',
        gridTemplateColumns: {
          xs: `10px repeat(${getUsers?.length}, calc(90% - 20px * 2)) 10px`,
          sm: `10px repeat(${getUsers?.length}, calc(80% - 20px * 2)) 10px`,
          md: `10px repeat(${getUsers?.length}, calc(40% - 20px * 2)) 10px`,
          lg: `10px repeat(${getUsers?.length}, calc(35% - 20px * 2)) 10px`,
        },
        gridTemplateRows: 'minmax(220px, 1fr)',
        overflowX: 'scroll',
        scrollSnapType: 'x proximity',
        "&:before": {
          content: '""'
        },
        "&:after": {
          content: '""'
        },
        '&::-webkit-scrollbar': {
          display: 'none'
        },
      }}>
        {
          getUsers?.map((item, index) => {
            return (
              <Box key={index} sx={{
                scrollSnapAlign: 'center',
                padding: 'calc(20px / 2 * 1.5)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                background: ' #fff',
                borderRadius: 2,
              }} ref={itemRef}>
                <Typography>{item?.fullName}</Typography>
              </Box>
            )
          })
        }
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Indicator />
      </Box>
    </Paper>
  )
}

export default Testing
