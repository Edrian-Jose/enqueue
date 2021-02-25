export default function Button({
  children,
  className,
  onClick,
  disabled = false,
  ...others
}) {
  const styles = [
    "select-none",
    "inline-block",
    "px-12",
    "py-3",
    others.disabled ? "bg-gray-400" : "bg-gray-700",
    "text-white",
    "text-xl",
    "rounded-lg",
    others.disabled ? "" : "hover:bg-gray-900",
    others.disabled ? "" : "hover:shadow-lg",
    others.disabled ? "cursor-not-allowed" : "cursor-pointer",
  ];

  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };
  return (
    <span
      className={styles.join(" ") + " " + className}
      onClick={() => handleClick()}
      {...others}
    >
      {children}
    </span>
  );
}
