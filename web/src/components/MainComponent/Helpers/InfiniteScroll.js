import { useEffect, useMemo } from 'react';

const InfiniteScroll = ({ data, fetchMore, variables, count, children, setLimit }) => {
  const handleScroll = useMemo(
    () => async () => {
      const loadMore = () => {
        const currentLength = data?.length;
        return fetchMore({
          variables: {
            ...variables,
            offset: currentLength
          }
        }).then(fetchMoreResult => {
          setLimit(currentLength + fetchMoreResult?.data?.getUserPosts?.posts?.length);
        })
      };

      const windowHeight = window.innerHeight;
      const scrollTop = document.documentElement.scrollTop;
      const offsetHeight = document.documentElement.offsetHeight;
      const scrolled = windowHeight + scrollTop >= offsetHeight;
      // Stop event listener if all the data has been loaded
      if (data.length >= count) {
        window.removeEventListener('scroll', handleScroll);
        return;
      }

      // Load more data if user has scrolled to bottom and if there's still data in db to display
      if (scrolled) {
        window.removeEventListener('scroll', handleScroll);
        loadMore();
      }
    },
    [count, data.length, fetchMore, variables, setLimit]
  );

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return children(data);
};


export default InfiniteScroll;
