import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useSnackbar } from "react-simple-snackbar";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import usePostsReducer from "../../redux/utils/usePostsReducer";
import Server from "../../Server";
import PostCard, { PostCardSkeleton } from "../PostCard/PostCard";

const Posts = () => {
  const loadingPosts = useSelector((state) => state.posts.loadingPosts);
  const posts = useSelector((state) => state.posts.posts);
  const currentPage = useSelector((state) => state.posts.currentPage);

  const maxPageCount = useRef(0);

  const { setPostsLoading, setPosts, setCurrentPostsPage } = usePostsReducer();

  const fetchNextPosts = useCallback(() => {
    if (maxPageCount.current - 1 <= currentPage && maxPageCount.current !== 0) {
      return;
    }

    setCurrentPostsPage(currentPage + 1);
  }, [maxPageCount, currentPage]);

  const { lastElementRef } = useInfiniteScroll(loadingPosts, fetchNextPosts);

  const [openError] = useSnackbar({ style: { backgroundColor: "red", color: "white", fontFamily: "monospace" } });

  useEffect(() => {
    setPostsLoading(true);
    Server.get(`/api/posts/?page=0`)
      .then((res) => {
        maxPageCount.current = res.data.maxPage;
        setPosts([...res.data.posts]);
        setPostsLoading(false);
      })
      .catch((error) => {
        openError(error?.response?.data?.message || error.message || "Something unexpected went wrong.");
        setPostsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (currentPage !== 0) {
      setPostsLoading(true);
      Server.get(`/api/posts/?page=${currentPage}`)
        .then((res) => {
          maxPageCount.current = res.data.maxPage;
          setPosts([...posts, ...res.data.posts]);
          setPostsLoading(false);
        })
        .catch((error) => {
          openError(error?.response?.data?.message || error.message || "Something unexpected went wrong.");
          setPostsLoading(false);
        });
    }
  }, [currentPage]);

  return (
    <div>
      {posts.map((post, index) =>
        index === posts.length - 1 ? (
          <div key={post._id} ref={lastElementRef}>
            <PostCard {...post} idx={index} />
          </div>
        ) : (
          <div key={post._id}>
            <PostCard {...post} idx={index} />
          </div>
        )
      )}
      {loadingPosts ? <PostCardSkeleton /> : <></>}
    </div>
  );
};

export default Posts;
