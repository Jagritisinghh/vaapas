import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";
import "./index.css"

const Searchbar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
    }
    setQuery('');
  };

  return (
    <form className='search-container' onSubmit={handleSubmit}>
        
      <input 
        type="text" 
        value={query}
        className='searchbar' 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search for a movie..." 
      />
      <button type="submit" className='search-button'><FaSearch size={20}/></button>
    </form>
  );
};

export default Searchbar;
