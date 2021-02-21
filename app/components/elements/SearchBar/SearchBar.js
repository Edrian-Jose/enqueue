import styles from "./SearchBar.module.scss";
import SearchIcon from "@material-ui/icons/Search";
import { useRouter } from "next/router";

export default function SearchBar() {
  const router = useRouter();
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      router.push("/search?q=" + event.target.value);
    }
  };
  return (
    <span className={styles.searchContainer}>
      <SearchIcon />
      <input
        type="text"
        placeholder="Search Services"
        className={styles.searchBar}
        onKeyPress={(e) => {
          handleKeyPress(e);
        }}
      />
    </span>
  );
}
