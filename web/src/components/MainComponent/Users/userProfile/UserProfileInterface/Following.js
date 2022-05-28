import React from 'react';

import FollowerFollowingBtn from '../Clickable/FollowerFollowingBtn';
import FollowerFollowingDialog from './FollowerFollowingDialog';

const Following = ({ getUser }) => {
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
        title='Following'
        value={getUser?.followingCount}
        handleClickOpen={handleClickOpen}
      />
      <FollowerFollowingDialog
        title='Following List'
        open={open}
        handleClose={handleClose}
        scroll={scroll}
        list={getUser?.following}
      />
    </>
  );
};
export default Following;
