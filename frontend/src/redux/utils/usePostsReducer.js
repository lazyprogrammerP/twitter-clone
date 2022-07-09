import { useDispatch } from "react-redux";
import { SET_CURRENT_POST_PAGE_ACTION, SET_POSTS_ACTION, SET_POSTS_LOADING_ACTION } from "../reducers/posts.reducer";

const usePostsReducer = () => {
  const dispatch = useDispatch();

  const setPostsLoading = (loading) => {
    dispatch({
      type: SET_POSTS_LOADING_ACTION,
      payload: loading,
    });
  };

  const setPosts = (posts) => {
    dispatch({
      type: SET_POSTS_ACTION,
      payload: posts,
    });
  };

  const setCurrentPostsPage = (page) => {
    dispatch({
      type: SET_CURRENT_POST_PAGE_ACTION,
      payload: page,
    });
  };

  return {
    setPostsLoading,
    setPosts,
    setCurrentPostsPage,
  };
};

export default usePostsReducer;
