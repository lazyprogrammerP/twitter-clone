import Link from "next/link";
import { useEffect, useState } from "react";
import { Bookmarks, DotsCircleHorizontal, Hash, Home as HomeIcon, List, MessageDots, Notification, User } from "tabler-icons-react";
import TailwindButton from "../TailwindButton/TailwindButton";
import LogoSVG from "./LogoSVG";

const sidebarItems = [
  {
    id: "home",
    link: "/",
    Icon: HomeIcon,
    name: "Home",
    active: true,
  },
  {
    id: "explore",
    link: "/explore",
    Icon: Hash,
    name: "Explore",
  },
  {
    id: "notifications",
    link: "/notifications",
    Icon: Notification,
    name: "Notifications",
  },
  {
    id: "messages",
    link: "/messages",
    Icon: MessageDots,
    name: "Messages",
  },
  {
    id: "bookmarks",
    link: "/bookmarks",
    Icon: Bookmarks,
    name: "Bookmarks",
  },
  {
    id: "lists",
    link: "/lists",
    Icon: List,
    name: "Lists",
  },
  {
    id: "profile",
    link: "/profile",
    Icon: User,
    name: "Profile",
  },
];

const Sidebar = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <div className={"overflow-auto p-4 pb-2 flex justify-between border-r-gray-800 absolute bottom-0 w-full border-t-2 border-t-gray-800 md:static md:w-72 md:border-t-0 md:border-r-2 md:flex-col md:h-screen"}>
      {/* Upper Sidebar */}
      <div className={"w-full"}>
        <div className={"hidden md:block"}>
          <LogoSVG />
        </div>

        <div className={"w-full flex items-center justify-around md:items-start md:my-4 md:flex-col md:gap-2"}>
          {sidebarItems.map(({ id, link, Icon, name, active }) => (
            <Link key={id} href={link}>
              <div className={"w-max rounded-md cursor-pointer flex items-center gap-2 transition-colors duration-200 hover:bg-gray-600 hover:bg-opacity-30 p-1 md:p-2"}>
                <Icon
                  className={"w-6 h-6 sm:w-8 sm:h-8"}
                  style={{
                    strokeWidth: active ? "2px" : "1.5px",
                  }}
                />
                <p className={`${active ? "font-semibold" : ""} text-lg hidden md:block`}>{name}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className={"hidden md:block"}>
          <TailwindButton label={"Tweet"} />
        </div>
      </div>

      {/* Lower Sidebar */}
      <div className={"p-2 rounded-md cursor-pointer items-center justify-between gap-2 transition-colors duration-200 hover:bg-gray-600 hover:bg-opacity-30 hidden md:flex"}>
        <div className={"flex items-center"}>
          <div className={"bg-gray-200 rounded-full overflow-hidden w-8 h-8 p-2"}>
            <img src={user.profilePic} />
          </div>

          <div className={"ml-2"}>
            <h5 className={"text-sm font-semibold"}>
              {user.firstName} {user.lastName}
            </h5>

            <p className={"-mt-1 text-xs text-gray-500"}>@{user.username}</p>
          </div>
        </div>

        <DotsCircleHorizontal className={"w-6 h-6"} />
      </div>
    </div>
  );
};

export default Sidebar;
