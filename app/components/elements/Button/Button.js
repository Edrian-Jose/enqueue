export default function Button({ children, onClick }) {
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
  return (
    <span className={styles.join(" ")} onClick={onClick}>
      {children}
    </span>
  );
}
