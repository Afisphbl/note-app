export default function Button({
  children,
  type = "button",
  onClick,
  className,
  title = "",
}) {
  return (
    <button className={className} onClick={onClick} type={type} title={title}>
      {children}
    </button>
  );
}
