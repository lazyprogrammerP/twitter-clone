export const SET_POSTS_LOADING_ACTION = "set_posts_loading";
export const SET_POSTS_ACTION = "set_posts";
export const SET_CURRENT_POST_PAGE_ACTION = "set_current_page";

const INITIAL_STATE = {
  loadingPosts: true,
  posts: [],
  currentPage: 0,
};

const postsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_POSTS_LOADING_ACTION:
      return {
        ...state,
        loadingPosts: action.payload,
      };

    case SET_POSTS_ACTION:
      return {
        ...state,
        posts: action.payload,
      };

    case SET_CURRENT_POST_PAGE_ACTION:
      return {
        ...state,
        currentPage: action.payload,
      };

    default:
      return state;
  }
};

export default postsReducer;
