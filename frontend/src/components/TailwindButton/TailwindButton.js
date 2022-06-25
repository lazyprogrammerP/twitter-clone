import { FadingCircle } from "better-react-spinkit";

const TailwindButton = ({ label, type, disabled, loading, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center justify-center w-full ${disabled || loading ? `bg-gray-700` : `bg-blue-500`} text-gray-200 p-2 rounded-md font-semibold`}
      disabled={disabled || loading}
    >
      <span>{label}</span>
      {loading && (
        <FadingCircle
          size={"16px"}
          color={"white"}
          style={{
            marginLeft: "12px",
          }}
        />
      )}
    </button>
  );
};

export default TailwindButton;
