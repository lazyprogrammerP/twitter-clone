const TailwindInput = ({ name, type, placeholder, required, Icon, size, classes = {}, multiline, rows }) => {
  return (
    <div>
      {multiline ? (
        <div className={`flex items-center p-2 rounded-md bg-gray-800 ${classes.inputWrapper}`}>
          {Icon && <Icon className={`text-gray-500 w-5 h-5 mr-2 ${classes.iconClass}`} />}
          <input name={name} type={type} placeholder={placeholder} required={required} className={`${size === "small" ? "text-xs" : "text-sm"} focus:outline-none w-full bg-transparent ${classes.input}`} />
        </div>
      ) : (
        <div className={`flex items-center p-3 rounded-md bg-gray-800 ${classes.inputWrapper}`}>
          <span
            role={"textbox"}
            contentEditable
            className={`${size === "small" ? "text-xs" : "text-sm"} focus:outline-none w-full bg-transparent ${classes.input}`}
            style={{
              minHeight: `${20 * rows}px`,
            }}
          ></span>
        </div>
      )}
    </div>
  );
};

export default TailwindInput;
