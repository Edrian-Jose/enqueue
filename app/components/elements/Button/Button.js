export default function Button({ children, className, ...others }) {
  const styles = [
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
  return (
    <span className={styles.join(" ") + " " + className} {...others}>
      {children}
    </span>
  );
}
