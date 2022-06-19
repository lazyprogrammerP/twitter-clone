const TailwindInput = ({ label, name, type, placeholder, required, Icon, size, classes = {} }) => {
  return (
    <div>
      <div className={`flex items-center p-2 rounded-md bg-gray-800 ${classes.inputWrapper}`}>
        {Icon && <Icon className={`text-gray-500 w-5 h-5 mr-2 ${classes.iconClass}`} />}
        <input name={name} type={type} placeholder={placeholder} required={required} className={`${size === "small" ? "text-xs" : "text-sm"} focus:outline-none w-full bg-transparent ${classes.input}`} />
      </div>
    </div>
  );
};

export default TailwindInput;
