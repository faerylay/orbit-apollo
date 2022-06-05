import React from 'react';

import { FollowerFollowingBtn, FollowerFollowingDialog } from './index';

const Followers = ({ getUser }) => {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState('paper');

  const handleClickOpen = scrollType => () => {
    setOpen(true);
    setScroll(scrollType);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // const descriptionElementRef = React.useRef(null);
  // React.useEffect(() => {
  //   if (open) {
  //     const { current: descriptionElement } = descriptionElementRef;
  //     if (descriptionElement !== null) {
  //       descriptionElement.focus();
  //     }
  //   }
  // }, [open]);

  return (
    <>
      <FollowerFollowingBtn
        title='Followers'
        value={getUser?.followerCount}
        handleClickOpen={handleClickOpen}
      />
      <FollowerFollowingDialog
        title='Followers List'
        open={open}
        handleClose={handleClose}
        scroll={scroll}
        list={getUser?.followers}
      />
    </>
  );
};
export default Followers;
