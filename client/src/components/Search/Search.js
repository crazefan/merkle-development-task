import React, { useState } from "react";
import styles from "./search.module.css";

const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Biography",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Film-Noir",
  "Game-Show",
  "History",
  "Horror",
  "Music",
  "Musical",
  "Mystery",
  "News",
  "Reality-TV",
  "Romance",
  "Sci-Fi",
  "Sport",
  "Talk-Show",
  "Thriller",
  "War",
  "Western",
];

const Search = () => {
  const [type, setType] = useState("");
  const [year, setYear] = useState();

  const handleYearChange = (e) => {
    setYear(e.target.value);
    console.log(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
    console.log(e.target.value);
  };

  const typeOptionsList = () =>
    genres.map((genre, key) => (
      <option key={key} value={genre.toLowerCase()}>
        {genre}
      </option>
    ));

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
      <input name="Search" id="search-input" type="text" className={styles.input} />
      <label htmlFor="year-input" className={styles.label}>
        Year:
      </label>
      <select name="Year" id="year-input" onChange={handleYearChange}>
        <option key="all" value="all">
          All years
        </option>
        {yearOptionsList()}
      </select>
      <label htmlFor="type-input" className={styles.label}>
        Type:
      </label>
      <select name="Type" id="type-input" onChange={handleTypeChange}>
        <option key="all" value="all">
          All genres
        </option>
        {typeOptionsList()}
      </select>
    </div>
  );
};

export default Search;
