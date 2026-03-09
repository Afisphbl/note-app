export default function Button({
  children,
  type = "button",
  onClick,
  className,
}) {
  return (
    <button className={className} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
