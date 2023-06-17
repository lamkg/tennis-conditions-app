
import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { geoApiOptions, GEO_API_URL } from "./api";
import { searchLocation } from './App';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';




const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState([]);

  const loadOptions = (inputValue) => {
    if(!inputValue) {
        return Promise.resolve({options: [] });
    }
    
    return fetch(
      `${GEO_API_URL}/cities?namePrefix=${inputValue}&limit=10&minPopulation=20000`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              label: `${city.name}, ${city.countryCode}`,
            };
          }),
        };
      });
  };

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
    // reset search state
    setSearch([]);
  };

  return (
    <AsyncPaginate
      className='search-input'
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    //   onKeyDown={(event) => {
    //     if (event.key === 'Enter') {
    //       searchLocation(); // Call the searchLocation function when the "Enter" key is pressed
    //     }
    //   }}
    />
  );
};

export default Search;