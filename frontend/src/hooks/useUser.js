import { useEffect, useState } from "react";

const useUser = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  return {
    user,
  };
};

export default useUser;
