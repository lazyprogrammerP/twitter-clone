import Header from "../src/components/layout/Header";
import Sidebar from "../src/components/layout/Sidebar";

export default function Home() {
  return (
    <div className={"w-full min-h-screen bg-gray-900 text-gray-200"}>
      <div className={"mx-auto max-w-6xl flex items-start"}>
        <div>
          <Sidebar />
        </div>

        <div className={"middle-row"}>
          <Header pageName={"Home"} />
        </div>

        <div className={"w-72 h-screen overflow-auto border-l-2 border-l-gray-800 hidden lg:block"}></div>
      </div>
    </div>
  );
}
