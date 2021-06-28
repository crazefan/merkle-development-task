import React, { useState, useEffect } from "react";
import { debounce } from "lodash";

import { fetchMovies } from "../../api/api";
import { countTotalPages } from "../../utils/utils";

import Spinner from "../Spinner/Spinner";
import MovieList from "./MovieList/MovieList";
import PageControl from "./PageControl/PageControl";
import SearchControl from "./SearchControl/SeachControl";

import { ChangeEventType, Movie } from "../../types";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [movieQuery, setMovieQuery] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number | undefined>();
  const [notFound, setNotFound] = useState(false);

  const search = async (searchvalue: string) => {
    setLoading(true);

    const [data] = await fetchMovies({
      movie: searchvalue.trim(),
      page: currentPage,
      type,
      year,
    });

    //check if search query is not empty and fetch movies from API, after that set results array to movies
    if (data && data.Response === "True") {
      setMovies([...data.Search]);
      setLoading(false);
      setNotFound(false);
      setTotalPages(countTotalPages(data.totalResults));
      return;
    }

    if (data && data.Response === "False") {
      setNotFound(true);
      setLoading(false);
      setMovies([]);

      return;
    }

    setNotFound(true);
    setLoading(false);
    setMovies([]);
  };

  const handlePageChange = (change: number) => {
    setCurrentPage(currentPage + change);
  };

  const handleInputChange = (e: ChangeEventType) => {
    setMovieQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleYearChange = (e: ChangeEventType) => {
    setYear(e.target.value);
    setCurrentPage(1);
  };

  const handleTypeChange = (e: ChangeEventType) => {
    setType(e.target.value);
    setCurrentPage(1);
  };

  // adds 300ms delay for search to avoid unnecessary calls to API with the help of lodash debounce
  const searchDebounce = debounce(() => {
    search(movieQuery);
  }, 300);

  // apply side effects whenever any input changes (unless input is empty)
  useEffect(() => {
    if (movieQuery) {
      searchDebounce();
    }
  }, [movieQuery, type, year, currentPage]);

  return (
    <div className="container mx-auto">
      <SearchControl
        onInputChange={handleInputChange}
        onTypeChange={handleTypeChange}
        onYearChange={handleYearChange}
      />
      {Array.isArray(movies) && movies.length > 0 && (
        <PageControl
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      )}

      {loading ? <Spinner /> : <MovieList movies={movies} notFound={notFound} />}
    </div>
  );
};

export default Search;
