import { Heart, MessageCircle, Refresh } from "tabler-icons-react";
import getTimeDifference from "../../utils/getTimeDifference";

const PostActionButton = ({ color, Icon, label }) => {
  const colorDictionary = {
    red: "text-red-300 hover:bg-red-300",
    green: "text-green-300 hover:bg-green-300",
    gray: "text-gray-300 hover:bg-gray-300",
  };

  return (
    <button className={`flex items-center gap-2 p-2 transition-all duration-200 rounded-md ${colorDictionary[color]} hover:bg-opacity-20 cursor-pointer`}>
      <Icon />
      <span className={"text-sm"}>{label}</span>
    </button>
  );
};

const PostCard = ({ content, postedBy, updatedAt }) => {
  return (
    <div className={"w-full p-4 border-b-2 border-b-gray-800"}>
      <div className={"flex items-start gap-2"}>
        <div className={"bg-gray-200 rounded-full overflow-hidden w-8 h-8 p-2"}>
          <img src={postedBy.profilePic} />
        </div>

        <div className={"w-full"}>
          {/* Postcard Header */}
          <div className={"flex items-center gap-2"}>
            <div className={"flex items-center gap-1"}>
              <h5 className={"text-sm font-semibold"}>
                {postedBy.firstName} {postedBy.lastName}
              </h5>

              <p className={"text-xs"}>@{postedBy.username}</p>
            </div>
            &#183;
            <p className={"text-sm text-gray-500"}>{getTimeDifference(new Date(updatedAt))} ago</p>
          </div>

          {/* Postcard Body */}
          <p className={"mt-1 text-sm"}>{content}</p>

          {/* Postcard Action */}
          <div className={"flex items-center justify-between mt-3"}>
            <PostActionButton Icon={Heart} />
            <PostActionButton Icon={MessageCircle} />
            <PostActionButton Icon={Refresh} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
