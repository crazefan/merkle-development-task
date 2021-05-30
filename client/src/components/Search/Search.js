import React, { useState, useEffect } from "react";
import { debounce } from "lodash";

import { fetchMovies } from "../../utils/api";

import Result from "./MovieList/Result";
import SearchControl from "./SearchControl/SeachControl";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [movieQuery, setMovieQuery] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [movies, setMovies] = useState([]);

  const search = async (searchvalue) => {
    const res = await fetchMovies({ movie: searchvalue.trim(), type: type, year: year });
    console.log(res);
    //check if search query is not empty and fetch movies from API, after that set results array to movies
    if (res.Response === "True") {
      setMovies([...res.Search]);
      console.log(res.Search);
    }
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
  const fetchDebounce = debounce(() => {
    search(movieQuery);
  }, 300);

  // apply side effects whenever any input changes (unless input is empty)
  useEffect(() => {
    if (movieQuery) {
      fetchDebounce();
    }
  }, [movieQuery, type, year]);

  return (
    <div class="container mx-auto py-4">
      <SearchControl
        onInputChange={handleInputChange}
        onTypeChange={handleTypeChange}
        onYearChange={handleYearChange}
      />
      <Result movies={movies} />
    </div>
  );
};

export default Search;
