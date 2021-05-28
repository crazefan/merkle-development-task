import React from "react";
import MovieCard from "./MovieCard/MovieCard";
import styles from "./result.module.css";

const Result = (movies: any[]) => {
  return (
    <div className={styles.container}>
      {movies.map((movie, idx) => {
        <MovieCard movie={movie} />;
      })}
    </div>
  );
};

export default Result;
