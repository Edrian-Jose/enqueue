export default function Button({
  children,
  className,
  onClick,
  color = "primary",
  disabled = false,
  ...others
}) {
  const colors = {
    primaryLighter: "bg-gray-600",
    secondaryLighter: "bg-yellow-400",
    primary: "bg-gray-700",
    secondary: "bg-yellow-500",
    primaryDarker: "bg-gray-800",
    secondaryDarker: "bg-yellow-600",
    primaryDarkest: "bg-gray-900",
    secondaryDarkest: "bg-yellow-700",
  };
  const styles = [
    "select-none",
    "inline-block",
    "px-12",
    "py-3",
    disabled ? colors[color + "Lighter"] : colors[color],
    "text-white",
    "text-xl",
    "rounded-lg",
    "focus:outline-none",
    "active:" + colors[color + "Darkest"],
    disabled ? "" : "hover:" + colors[color + "Darker"],
    disabled ? "" : "hover:shadow-lg",
    disabled ? "cursor-not-allowed" : "cursor-pointer",
  ];

  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };
  return (
    <button
      className={styles.join(" ") + " " + className}
      onClick={() => handleClick()}
      {...others}
    >
      {children}
    </button>
  );
}
