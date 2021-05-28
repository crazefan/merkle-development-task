import React from "react";
import { MovieCardProps } from "./types";
import styles from "./moviecard.module.css";

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div>
      <p>Title: {movie.Title}</p>
      <p>Year: {movie.Year}</p>
      <p>imdb ID: {movie.imdbID}</p>
      <p>Type: {movie.Title}</p>
      <img src={movie.Poster} className={styles.poster} />
    </div>
  );
};

export default MovieCard;
