import React from "react";
import styles from "./searchcontrol.module.css";

const SearchControl = ({ onInputChange, onTypeChange, onYearChange }) => {
  // generate options for years from 1874 to 2021
  const yearOptionsList = () => {
    const years = Array.from(Array(149), (x, i) => 2021 - i);
    return years.map((year, key) => (
      <option key={key} value={year}>
        {year}
      </option>
    ));
  };
  return (
    <div className={styles.container}>
      <label htmlFor="search-input" className={styles.label}>
        Search movies:
      </label>
      <input
        name="Search"
        id="search-input"
        type="text"
        className={styles.input}
        onChange={onInputChange}
      />

      <label htmlFor="year-input" className={styles.label}>
        Year:
      </label>
      <select name="Year" id="year-input" onChange={onYearChange}>
        <option key="all" value="">
          All years
        </option>
        {yearOptionsList()}
      </select>
      <label htmlFor="type-input" className={styles.label}>
        Type:
      </label>
      <select name="Type" id="type-input" onChange={onTypeChange}>
        <option key="all" value="">
          All genres
        </option>
        <option value="movie">Movie</option>
        <option value="episode">Episode</option>
        <option value="series">Series</option>
      </select>
    </div>
  );
};

export default SearchControl;
