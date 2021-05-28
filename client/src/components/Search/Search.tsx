import React, { useState } from "react";
import { fetchMovies } from "../../utils/api";
import styles from "./search.module.css";

const genres = ["Movie", "Episode", "Series"];

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [movieQuery, setMovieQuery] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [year, setYear] = useState<number | "">("");

  const handleSearch = async (e: any) => {
    setMovieQuery(e.target.value);
    await fetchMovies({ movie: movieQuery, type: type, year: year });
  };

  const handleYearChange = async (e: any) => {
    setYear(e.target.value);
    if (movieQuery) {
      await fetchMovies({ movie: movieQuery, type: type, year: year });
    }
  };

  const handleTypeChange = async (e: any) => {
    setType(e.target.value);
    if (movieQuery) {
      await fetchMovies({ movie: movieQuery, type: type, year: year });
    }
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
      <input
        name="Search"
        id="search-input"
        type="text"
        className={styles.input}
        onChange={handleSearch}
      />

      <label htmlFor="year-input" className={styles.label}>
        Year:
      </label>
      <select name="Year" id="year-input" onChange={handleYearChange}>
        <option key="all" value="">
          All years
        </option>
        {yearOptionsList()}
      </select>
      <label htmlFor="type-input" className={styles.label}>
        Type:
      </label>
      <select name="Type" id="type-input" onChange={handleTypeChange}>
        <option key="all" value="">
          All genres
        </option>
        {typeOptionsList()}
      </select>
    </div>
  );
};

export default Search;
