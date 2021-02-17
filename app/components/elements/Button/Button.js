export default function Button({ children }) {
  const styles = [
    "inline-block",
    "cursor-pointer",
    "px-12",
    "py-3",
    "bg-gray-700",
    "text-white",
    "text-xl",
    "rounded-lg",
    "hover:bg-gray-900",
    "hover:shadow-lg",
  ];
  return <span className={styles.join(" ")}>{children}</span>;
}
