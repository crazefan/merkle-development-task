import React from "react";
import MovieCard from "./MovieCard/MovieCard";

const MovieList = ({ movies, notFound }) => {
  const renderCards = () => {
    if (movies.length) {
      return movies.map((movie, idx) => <MovieCard movie={movie} />);
    }
    return null;
  };
  return (
    <div className="flex flex-wrap items-center content-center my-8">
      {notFound ? <p className="mx-auto">Movie not found!</p> : renderCards()}
    </div>
  );
};

export default MovieList;
