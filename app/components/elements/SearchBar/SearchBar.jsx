import styles from "./SearchBar.module.scss";

export default function SearchBar() {
  return (
    <span className={styles.searchContainer}>
      <img
        src="/icons/search-black.svg"
        alt="Search Icon"
        className={styles.searchIcon}
      />
      <input
        type="text"
        placeholder="Search Services"
        className={styles.searchBar}
      />
    </span>
  );
}
