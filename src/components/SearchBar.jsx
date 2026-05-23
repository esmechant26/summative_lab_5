import React from "react";
import "./SearchBar.css";

function Search({ setSearch }) {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search Products" onChange={(e) => setSearch(e.target.value)} />
      <i className="circular search link icon"></i>
    </div>
  );
}

export default Search;
