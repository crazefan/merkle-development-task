import React, { useState, useEffect } from "react";
import { fetchMovies } from "../../utils/api";
import styles from "./search.module.css";
import Result from "../Result/Result";

const genres = ["Movie", "Episode", "Series"];

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [movieQuery, setMovieQuery] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [year, setYear] = useState<number | "">("");
  const [movies, setMovies] = useState<any[]>([]);

  const search = async (searchvalue: string) => {
    const res: any = await fetchMovies({ movie: searchvalue.trim(), type: type, year: year });
    console.log(res);
    //check if search query is not empty and fetch movies from API, after that set results array to movies
    if (res.Response === "True") {
      setMovies([...res.Search]);
      console.log(res.Search);
    }
  };

  const handleSearch = (e: any) => {
    //really weird workaround, need to fix
    setMovieQuery(e.target.value);
  };

  const handleYearChange = (e: any) => {
    setYear(e.target.value);
  };

  const handleTypeChange = (e: any) => {
    setType(e.target.value);
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

  useEffect(() => {
    search(movieQuery);
  }, [movieQuery, type, year]);

  return (
    <>
      <div className={styles.container}>
        <label htmlFor="search-input" className={styles.label}>
          Search movies:
        </label>
        <input
          name="Search"
          id="search-input"
          type="text"
          value={movieQuery}
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
      <Result movies={movies} />
    </>
  );
};

export default Search;
