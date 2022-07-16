import { X } from "tabler-icons-react";

const Modal = ({ open, onClose, title, children }) => {
  return (
    <div className={`relative ${open ? "z-10" : "-z-10"}`}>
      <div className={`fixed inset-0 bg-gray-800 ${open ? "bg-opacity-75" : "bg-opacity-0"}`}></div>
      <div className={"fixed z-10 inset-0 flex items-center justify-center p-6"}>
        <div className={"w-full relative bg-gray-900 rounded-md sm:max-w-lg"}>
          <div className={"p-3 border-b-2 border-b-gray-800 flex items-center justify-between"}>
            <h3 className={"text-lg font-bold"}>{title}</h3>

            <button onClick={onClose} className={"bg-gray-800 bg-opacity-75 p-2 rounded-md cursor-pointer"}>
              <X className={"w-5 h-5"} />
            </button>
          </div>

          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
