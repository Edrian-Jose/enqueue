import styles from "./SearchBar.module.scss";
import SearchIcon from "@material-ui/icons/Search";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState(router.query.q || "");

  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && query != "") {
      router.push("/search?q=" + event.target.value);
    }
  };
  return (
    <span className={styles.searchContainer}>
      <SearchIcon />
      <input
        type="text"
        placeholder="Search Services"
        value={query}
        className={styles.searchBar}
        onKeyPress={(e) => {
          handleKeyPress(e);
        }}
        onChange={(e) => {
          handleChange(e);
        }}
      />
    </span>
  );
}
