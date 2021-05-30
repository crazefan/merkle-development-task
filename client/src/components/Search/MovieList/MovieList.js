import React from "react";
import MovieCard from "./MovieCard/MovieCard";

const MovieList = ({ movies }) => {
  const renderCards = () => {
    if (movies.length) {
      return movies.map((movie, idx) => <MovieCard movie={movie} />);
    }
    return null;
  };
  return <div className="flex flex-wrap items-center content-center my-8">{renderCards()}</div>;
};

export default MovieList;
