function InputField({
  onChange,
  value,
  type,
  className,
  placeholder,
  required,
}) {
  return (
    <input
      onChange={onChange}
      value={value}
      type={type}
      className={`w-full focus:bg-[#fff] px-4 py-4 border border-[#f2f2] rounded-md shadow-md bg-[#ffffff] outline-none ${className}`}
      placeholder={placeholder}
    />
  );
}

export default InputField;
