import React from "react";
import { MovieCardProps } from "../../../../types";

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <div className="flex-5 items-center border-4 mx-auto my-4 rounded-xl">
      <div className="flex items-center">
        <div className="px-2">
          <img
            className="w-20  object-scale-down"
            src={movie.Poster}
            alt="Movie poster"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const element = e.target as HTMLImageElement;
              element.onerror = null;
              element.src = "https://i.imgur.com/ylFANk8.jpg";
            }}
          />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-purple-600 font-semibold">
            {movie.Title}
          </div>
          <div className="mt-1 text-black">
            <p>Year: {movie.Year}</p>
            <p>IMDb ID: {movie.imdbID}</p>
            <a
              className="underline text-purple"
              href={`https://www.imdb.com/title/${movie.imdbID}`}
              target="_blank"
              rel="noreferrer"
            >
              IMDb Link
            </a>
            <p>Type: {movie.Type}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
