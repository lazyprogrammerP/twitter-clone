import { Wave } from "better-react-spinkit";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSnackbar } from "react-simple-snackbar";
import { Heart, MessageCircle, Refresh, RefreshOff } from "tabler-icons-react";
import useUser from "../../hooks/useUser";
import usePostsReducer from "../../redux/utils/usePostsReducer";
import Server from "../../Server";
import getTimeDifference from "../../utils/getTimeDifference";

const PostActionButton = ({ color, Icon, fill = "transparent", showBackground, value, label, onClick }) => {
  const colorDictionary = {
    red: "text-red-300 bg-red-300",
    green: "text-green-300 bg-green-300",
    gray: "text-gray-300 bg-gray-300",
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 p-2 transition-all duration-200 rounded-md ${colorDictionary[color]} ${showBackground ? "bg-opacity-20 hover:bg-opacity-20" : "bg-opacity-0 hover:bg-opacity-20"} cursor-pointer`}
    >
      <Icon fill={fill} />

      <div className={"text-sm"}>
        {value !== undefined ? <span>{value}&nbsp;</span> : <></>}
        <span className={"hidden sm:inline"}>{label}</span>
      </div>
    </button>
  );
};

export const PostCardSkeleton = () => {
  return (
    <div className={"w-full p-4 border-b-2 border-b-gray-800"}>
      <div className={"flex items-start gap-2"}>
        <div className={"bg-gray-800 rounded-full overflow-hidden w-8 h-8 p-2 animate-pulse"} />

        <div className={"w-full"}>
          {/* Postcard Header */}
          <div className={"flex items-center gap-2"}>
            <div className={"flex items-center gap-2"}>
              <h5 className={"w-32 md:w-40 bg-gray-800 p-2 rounded-md animate-pulse"} />

              <p className={"w-24 md:w-32 bg-gray-800 p-2 rounded-md animate-pulse"} />
            </div>
            &#183;
            <p className={"w-16 bg-gray-800 p-2 rounded-md animate-pulse"} />
          </div>

          {/* Postcard Body */}
          <p className={"mt-1 w-full h-20 bg-gray-800 p-2 rounded-md animate-pulse"} />

          {/* Postcard Action */}
          <div className={"flex items-center justify-between mt-3"}>
            <PostActionButton Icon={Heart} value={0} label={"Likes"} color={"red"} />
            <PostActionButton Icon={MessageCircle} value={0} label={"Replies"} color={"green"} />
            <PostActionButton Icon={Refresh} value={0} label={"Retweets"} color={"gray"} />
          </div>
        </div>
      </div>
    </div>
  );
};

const PostCard = ({ content, postedBy, createdAt, _id, idx, likes = [], retweetData = {}, retweetedBy }) => {
  const posts = useSelector((state) => state.posts.posts);
  const { setPosts } = usePostsReducer();

  const { user } = useUser();
  const [likedByUser, setLikedByUser] = useState(false);

  const [retweeting, setRetweeting] = useState(false);
  const [retweetedByUser, setRetweetedByUser] = useState(false);

  const [openSuccess] = useSnackbar({ style: { backgroundColor: "green", color: "white", fontFamily: "monospace" } });
  const [openError] = useSnackbar({ style: { backgroundColor: "red", color: "white", fontFamily: "monospace" } });

  const updatePost = (updatedPost) => {
    setPosts([...posts.slice(0, idx), updatedPost, ...posts.slice(idx + 1, posts.length)]);
  };

  const onLike = () => {
    updatePost({
      ...posts[idx],
      likes: likedByUser ? likes.filter((id) => id !== user?._id) : [...likes, user?._id],
    });

    Server.put(`api/posts/${_id}/like`)
      .then((res) => {
        updatePost({
          ...res.data,
        });
      })
      .catch((error) => {
        openError(error?.response?.data?.message || error.message || "Something unexpected went wrong.");
      });
  };

  const onRetweet = () => {
    setRetweeting(true);

    Server.post(`api/posts/${_id}/retweet`)
      .then((res) => {
        updatePost({ ...res.data });
        setRetweeting(false);
      })
      .catch((error) => {
        openError(error?.response?.data?.message || error.message || "Something unexpected went wrong.");
        setRetweeting(false);
      });
  };

  useEffect(() => {
    setLikedByUser(likes.includes(user?._id));
    setRetweetedByUser(retweetedBy.includes(user?._id));
  }, [user, likes]);

  return (
    <div className={"w-full p-4 border-b-2 border-b-gray-800"}>
      {retweetData.content ? <p className={"text-xs text-gray-500 mb-2"}>Retweeted By @{postedBy.username}</p> : <></>}

      <div className={"flex items-start gap-2"}>
        <div className={"bg-gray-200 rounded-full overflow-hidden w-8 h-8 p-2"}>
          <img src={postedBy.profilePic} />
        </div>

        <div className={"w-full"}>
          {/* Postcard Header */}
          <div className={"flex items-center gap-2"}>
            <div className={"flex items-center gap-1"}>
              <h5 className={"text-sm font-semibold"}>
                {retweetData.postedBy?.firstName || postedBy.firstName} {retweetData.postedBy?.lastName || postedBy.lastName}
              </h5>

              <p className={"text-xs"}>@{retweetData.postedBy?.username || postedBy.username}</p>
            </div>
            &#183;
            <p className={"text-sm text-gray-500"}>{getTimeDifference(new Date(createdAt))} ago</p>
          </div>

          {/* Postcard Body */}
          <p className={"mt-1 text-sm"}>{retweetData.content || content}</p>

          {/* Postcard Action */}
          <div className={"flex items-center justify-between mt-3"}>
            <PostActionButton Icon={Heart} fill={likedByUser ? "rgb(252, 165, 165)" : "transparent"} value={likes?.length} label={"Likes"} color={"red"} onClick={onLike} />
            <PostActionButton Icon={MessageCircle} value={0} label={"Replies"} color={"green"} />
            {!retweetData.content ? (
              <PostActionButton
                Icon={!retweeting ? (retweetedByUser ? RefreshOff : Refresh) : () => <Wave color={"#fff"} />}
                showBackground={retweetedByUser}
                value={retweetedBy?.length}
                label={"Retweets"}
                color={"gray"}
                onClick={onRetweet}
              />
            ) : (
              <PostActionButton Icon={RefreshOff} label={<strike>Retweets</strike>} color={"gray"} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
