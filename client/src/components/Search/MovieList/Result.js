import React from "react";
import MovieCard from "./MovieCard/MovieCard";
import styles from "./result.module.css";

const Result = ({ movies }) => {
  const renderCards = () => {
    if (movies.length) {
      return movies.map((movie, idx) => <MovieCard movie={movie} />);
    }
    return null;
  };
  return <div className={styles.container}>{renderCards()}</div>;
};

export default Result;
