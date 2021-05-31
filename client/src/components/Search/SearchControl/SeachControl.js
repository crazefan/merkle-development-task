import React from "react";

const SearchControl = ({ onInputChange, onTypeChange, onYearChange }) => {
  // generate options for years from 1874 to 2021
  const yearOptionsList = () => {
    const years = Array.from(Array(149), (x, i) => 2021 - i);
    return years.map((year, key) => (
      <option key={key} value={year}>
        {year}
      </option>
    ));
  };
  return (
    <div className="flex justify-center items-center my-8">
      <div className="mx-4">
        <label>
          Search movies:
          <input
            className="shadow appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 border rounded py-2 px-3 mx-2 text-grey-darker"
            name="Search"
            id="search-input"
            type="text"
            onChange={onInputChange}
          />
        </label>
      </div>

      <div>
        <label htmlFor="year-input">Year:</label>
        <select className="mx-2" name="Year" id="year-input" onChange={onYearChange}>
          <option key="all" value="">
            All years
          </option>
          {yearOptionsList()}
        </select>

        <label htmlFor="type-input">Type:</label>
        <select className="mx-2" name="Type" id="type-input" onChange={onTypeChange}>
          <option key="all" value="">
            All genres
          </option>
          <option value="movie">Movie</option>
          <option value="episode">Episode</option>
          <option value="series">Series</option>
          <option value="game">Game</option>
        </select>
      </div>
    </div>
  );
};

export default SearchControl;
