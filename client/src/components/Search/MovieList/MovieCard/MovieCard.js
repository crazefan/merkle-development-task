import React from "react";

const MovieCard = ({ movie }) => {
  return (
    <div className="flex-5 items-center border-4 mx-auto my-4 rounded-xl">
      <div className="flex items-center">
        <div className="px-2">
          <img className="w-20  object-scale-down" src={movie.Poster} alt="Movie poster" />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-purple-600 font-semibold">
            {movie.Title}
          </div>
          <div className="mt-1 text-black">
            <p>Year: {movie.Year}</p>
            <p>imdb ID: {movie.imdbID}</p>
            <p>Type: {movie.Type}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
