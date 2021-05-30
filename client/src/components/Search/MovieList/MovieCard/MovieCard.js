import React from "react";
import styles from "./moviecard.module.css";

const MovieCard = ({ movie }) => {
  return (
    <div class="flex-initial max-w-250 max-h-75 mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div class="md:flex">
        <div class="md:flex-shrink-0">
          <img class="h-48 h-75 object-cover" src={movie.Poster} alt="Movie poster" />
        </div>
        <div class="p-8">
          <div class="uppercase tracking-wide text-sm text-purple-500 font-semibold">
            {movie.Title}
          </div>
          <div class="mt-2 text-black-500">
            <p>Year: {movie.Year}</p>
            <p>imdb ID: {movie.imdbID}</p>
            <p>Type: {movie.Title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
