export default function Input({
  type = "text",
  label,
  value,
  onChange,
  placeholder,
  className = "",
  title,
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      title={title}
    />
  );
}
