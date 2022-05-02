import { useState, useEffect } from 'react';

export default function Delay({ children, waitBeforeShow = 3000 }) {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsShown(true);
    }, waitBeforeShow);
  }, [waitBeforeShow]);

  return isShown ? children : null;
}
