import styles from "./SearchBar.module.scss";
import SearchIcon from "@material-ui/icons/Search";
export default function SearchBar() {
  return (
    <span className={styles.searchContainer}>
      <SearchIcon/>
      <input
        type="text"
        placeholder="Search Services"
        className={styles.searchBar}
      />
    </span>
  );
}
