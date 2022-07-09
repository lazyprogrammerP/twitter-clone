import { useCallback, useRef } from "react";

const useInfiniteScroll = (loading, fetchNext) => {
  const observer = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchNext();
        }
      });

      if (node) {
        observer.current.observe(node);
      }
    },
    [loading]
  );

  return { lastElementRef };
};

export default useInfiniteScroll;
