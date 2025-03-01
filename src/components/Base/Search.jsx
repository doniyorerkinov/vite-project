'use client';

import { useState, useRef, useEffect } from 'react';
import { SearchIcon } from 'lucide-react';

const Search = ({ onSearch, placeholder = 'Search...', className = '' }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null);

  // Debounce search to avoid excessive API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm !== '') {
        onSearch(searchTerm);
      } else {
        // If search is cleared, reset to default search (no filter)
        onSearch('');
      }
    }, 500); // 500ms debounce delay

    return () => clearTimeout(timer);
  }, [searchTerm, onSearch]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (!searchTerm) {
      setIsFocused(false);
    }
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      className={`relative flex items-center rounded-lg border border-gray-300 bg-white ${
        isFocused ? 'w-64' : 'w-44'
      } transition-all duration-300 ${className}`}
    >
      <div className="flex items-center pl-3 text-gray-500">
        <SearchIcon size={18} />
      </div>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="w-full py-2 px-2 bg-transparent outline-none text-sm"
      />
      {searchTerm && (
        <button
          onClick={clearSearch}
          className="pr-3 text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default Search;
