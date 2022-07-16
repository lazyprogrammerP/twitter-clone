import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useSnackbar } from "react-simple-snackbar";
import { CalendarEvent, Microphone, MoodCry, Photo, Video } from "tabler-icons-react";
import useUser from "../../hooks/useUser";
import usePostsReducer from "../../redux/utils/usePostsReducer";
import Server from "../../Server";
import TailwindButton from "../TailwindButton/TailwindButton";
import TailwindInput from "../TailwindInput/TailwindInput";

const postActionItems = [
  {
    id: 1,
    name: "photo",
    Icon: Photo,
  },
  {
    id: 2,
    name: "video",
    Icon: Video,
  },
  {
    id: 3,
    name: "microphone",
    Icon: Microphone,
  },
  {
    id: 4,
    name: "moodcry",
    Icon: MoodCry,
  },
  {
    id: 5,
    name: "calendarevent",
    Icon: CalendarEvent,
  },
];

const PostForm = () => {
  const { user } = useUser();

  const spanRef = useRef();

  const posts = useSelector((state) => state.posts.posts);
  const { setPosts } = usePostsReducer();

  const [posting, setPosting] = useState(false);

  const [openSuccess] = useSnackbar({ style: { backgroundColor: "green", color: "white", fontFamily: "monospace" } });
  const [openError] = useSnackbar({ style: { backgroundColor: "red", color: "white", fontFamily: "monospace" } });

  const onPost = (e) => {
    e.preventDefault();

    setPosting(true);
    Server.post("api/posts/", {
      content: spanRef.current.innerHTML,
    })
      .then((res) => {
        setPosts([res.data, ...posts]);
        openSuccess("Post was successfully published!");
        setPosting(false);
        spanRef.current.innerHTML = "";
      })
      .catch((error) => {
        openError(error?.response?.data?.message || error.message || "Something unexpected went wrong.");
        setPosting(false);
      });
  };

  return (
    <form onSubmit={onPost} className={"p-4 border-b-2 border-b-gray-800"}>
      <div className={"flex items-start bg-gray-800 p-4 rounded-md"}>
        <div className={"bg-gray-200 rounded-full overflow-hidden w-8 h-8 p-2 mr-2"}>
          <img src={user?.profilePic} />
        </div>

        <div className={"w-full"}>
          <TailwindInput
            classes={{
              inputWrapper: "p-0 py-1",
              input: "postForm",
            }}
            multiline
            rows={2}
            textAreaRef={spanRef}
          />
        </div>
      </div>

      <div className={"flex items-center justify-between mt-4"}>
        <div className={"flex items-center gap-2 text-blue-300"}>
          {postActionItems.map(({ id, Icon }) => (
            <div key={id} className={"p-1 rounded-md hover:bg-blue-300 hover:bg-opacity-20 transition-colors duration-200 cursor-pointer"}>
              <Icon className={"w-6 h-6"} />
            </div>
          ))}
        </div>

        <div className={"w-20"}>
          <TailwindButton label={"Post"} loading={posting} />
        </div>
      </div>
    </form>
  );
};

export default PostForm;
