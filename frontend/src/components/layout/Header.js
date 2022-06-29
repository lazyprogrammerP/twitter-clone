import { useEffect, useState } from "react";
import { Menu2 } from "tabler-icons-react";

const Header = ({ pageName }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return (
    <div className={"w-full p-3 md:p-3 flex items-center justify-between border-b-2 border-b-gray-800"}>
      <div className={"flex items-center"}>
        <div className={"bg-gray-200 rounded-full overflow-hidden w-8 h-8 p-2 mr-2 md:hidden"}>
          <img src={user.profilePic} />
        </div>

        <h5 className={"font-semibold sm:text-lg md:text-xl"}>{pageName}</h5>
      </div>

      <Menu2 className={"w-8 h-8 p-1 rounded-md transition-colors duration-200 hover:bg-gray-600 hover:bg-opacity-30 md:hidden"} />
    </div>
  );
};

export default Header;
