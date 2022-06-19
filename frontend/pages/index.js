import { useEffect } from "react";
import Server from "../src/Server";

export default function Home() {
  useEffect(() => {
    Server.get("").then(console.log).catch(console.log);
  }, []);

  return <div>Home Page</div>;
}
