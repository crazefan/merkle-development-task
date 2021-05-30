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
    <div class="container flex justify-center space-x-4">
      <label>
        Search movies:
        <input
          class="border mx-4 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent ..."
          name="Search"
          id="search-input"
          type="text"
          onChange={onInputChange}
        />
      </label>

      <label htmlFor="year-input" className="">
        Year:
        <select class="mx-2" name="Year" id="year-input" onChange={onYearChange}>
          <option key="all" value="">
            All years
          </option>
          {yearOptionsList()}
        </select>
      </label>

      <label htmlFor="type-input" className="">
        Type:
        <select class="mx-2" name="Type" id="type-input" onChange={onTypeChange}>
          <option key="all" value="">
            All genres
          </option>
          <option value="movie">Movie</option>
          <option value="episode">Episode</option>
          <option value="series">Series</option>
        </select>
      </label>
    </div>
  );
};

export default SearchControl;
