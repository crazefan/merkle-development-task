import React from "react";
import MovieCard from "./MovieCard/MovieCard";
import styles from "./result.module.css";
import { ResultProps } from "./types";

const Result = ({ movies }: ResultProps) => {
  const renderCards = () => {
    if (movies.length) {
      return movies.map((movie: any, idx: any) => <MovieCard movie={movie} />);
    }
    return null;
  };
  return <div className={styles.container}>{renderCards()}</div>;
};

export default Result;
