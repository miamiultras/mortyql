import React, { SetStateAction, useState } from "react";
import styles from "./search.module.scss";

type SearchProps = {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

function debounce<T>(callback: (arg: T) => void, wait: number) {
  let timeout: NodeJS.Timeout;
  return (arg: T) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(arg), wait);
  };
}

export function Search({ setQuery }: SearchProps) {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
    handleSearch(value);
  };

  const handleSearch = debounce<SetStateAction<string>>((value) => {
    setQuery(value);
  }, 500);

  return (
    <div className={styles.searchWrapper}>
      <input
        aria-label="search"
        name="search"
        placeholder="Search..."
        className={styles.search}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
