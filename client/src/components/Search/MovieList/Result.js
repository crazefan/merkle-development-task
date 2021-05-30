import React from "react";
import MovieCard from "./MovieCard/MovieCard";

const Result = ({ movies }) => {
  const renderCards = () => {
    if (movies.length) {
      return movies.map((movie, idx) => <MovieCard movie={movie} />);
    }
    return null;
  };
  return (
    <div className="container max-w-400 mx-auto grid grid-cols-2 justify-center gap-2 space-y-6 my-7">
      {renderCards()}
    </div>
  );
};

export default Result;
