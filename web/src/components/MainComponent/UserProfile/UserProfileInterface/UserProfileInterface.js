// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Box, Container, Grid, Typography, useMediaQuery } from '@mui/material';
// import { useTheme } from '@mui/material/styles';


// import { ProfileCoverImage, ProfileImage, Followers, Following, MessageFollowEditBtn } from './index';
// import { useStyles } from './styles';

// const UserProfileInterface = ({ getUser, userId, isUserOnline }) => {
//   const theme = useTheme();
//   const matchDownMd = useMediaQuery(theme.breakpoints.down('sm'));
//   const classes = useStyles({ matchDownMd })
//   const auth = useSelector(state => state?.users?.user);

//   return (
//     <>
//       <Box className={classes.coverImage} >
//         <ProfileCoverImage getUser={getUser} />
//       </Box>

//       <Container sx={{ maxWidth: { xs: '300px', sm: '100%' }, padding: { xs: 0, sm: 0 }, position: 'relative' }} >
//         <Grid container paddingTop={2} paddingBottom={1}>
//           <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}  >
//             <Box
//               sx={{
//                 shrink: 0,
//                 width: { xs: '100%', sm: 120 },
//                 marginLeft: { xs: -2, sm: 0 },
//                 position: 'relative',
//                 borderRadius: '100%',
//                 overflow: 'hidden',
//                 border: `2px solid ${isUserOnline && auth?.id !== userId
//                   ? theme.palette.success.dark
//                   : 'dodgerblue'
//                   }`
//               }}
//             >
//               <ProfileImage getUser={getUser} />
//             </Box>
//           </Grid>
//           <Grid item xs={8} >
//             <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }} >
//               <Box
//                 sx={{
//                   mb: 1,
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: { xs: 'center', sm: 'left' }
//                 }}
//               >
//                 <Typography
//                   variant='h3'
//                   sx={{ fontSize: { xs: '1.5rem', sm: '1.5rem' } }}
//                   marginRight={1}
//                 >
//                   {getUser?.fullName}
//                 </Typography>
//               </Box>

//               <Box sx={{ width: { xs: '100%', sm: '60%', md: '50%' } }}>
//                 <Grid container >
//                   <Grid item xs={12} sx={{ display: 'flex' }}>
//                     <Following getUser={getUser} />
//                     <Followers getUser={getUser} />
//                   </Grid>
//                 </Grid>
//               </Box>
//             </Box>
//             <Box sx={{ width: { xs: '100%', sm: '60%', md: '50%' } }}>
//               <MessageFollowEditBtn getUser={getUser} />
//             </Box>
//           </Grid>
//           <Grid container>
//             <Grid item xs={4} />
//             <Grid item xs={8} >
//               <Box sx={{ display: 'flex', justifyContent: 'start' }}>
//                 <Typography variant='h5' align='center' >
//                   I'm Website Developer
//                 </Typography>
//               </Box>
//             </Grid>
//           </Grid>
//         </Grid>

//       </Container>

//     </>
//   );
// };

// export default UserProfileInterface;
