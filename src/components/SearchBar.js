import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); 
  };

  return (
    <form className="d-flex align-items-center" role="search">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search Pokemon..."
        aria-label="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      
      <button className="btn btn-outline-success" type="button">
        <i className="bi bi-search"></i> 
      </button>
    </form>
  );
};

export default SearchBar;
