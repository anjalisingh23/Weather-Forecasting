import React, { useState, useEffect } from "react";
import "./SearchBar.css"; // Import CSS file for styling

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");
  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (city.trim()) {
      onSearch(city.trim());
    }
    setCity("");
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search City..."
        value={city}
        onChange={handleInputChange}
        className="search-input"
      />
      <button type="submit" className="search-button">
        <img src="/images/search1.png" width={40} />
      </button>
    </form>
  );
}

export default SearchBar;
