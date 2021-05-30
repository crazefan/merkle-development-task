import React, { useState, useEffect } from "react";
import { debounce } from "lodash";

import { fetchMovies } from "../../utils/api";

import Result from "./MovieList/MovieList";
import SearchControl from "./SearchControl/SeachControl";
import Spinner from "../Spinner/Spinner";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [movieQuery, setMovieQuery] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [movies, setMovies] = useState([]);
  const [resultPage, setResultPage] = useState(1);

  const search = async (searchvalue) => {
    setLoading(true);
    const res = await fetchMovies({ movie: searchvalue.trim(), type: type, year: year });
    console.log(res);
    //check if search query is not empty and fetch movies from API, after that set results array to movies
    if (res.Response === "True") {
      setMovies([...res.Search]);
      console.log(res.Search);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setMovieQuery(e.target.value);
  };

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  // adds 500ms delay for search to avoid unnecessary calls to API using lodash debounce
  const searchDebounce = debounce(() => {
    search(movieQuery);
  }, 300);

  // apply side effects whenever any input changes (unless input is empty)
  useEffect(() => {
    if (movieQuery) {
      searchDebounce();
    }
  }, [movieQuery, type, year]);

  return (
    <div className="container mx-auto">
      <SearchControl
        onInputChange={handleInputChange}
        onTypeChange={handleTypeChange}
        onYearChange={handleYearChange}
      />
      {loading ? <Spinner /> : <Result movies={movies} />}
    </div>
  );
};

export default Search;
