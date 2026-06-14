import React from 'react';
import '../styles/searchBar.css';

function SearchBar({ searchQuery, onSearchChange, onOpenSettings }) {
  return (
    <div className="search-container">
      <input 
        type="text" 
        placeholder="Поиск по названию..." 
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <button id="setting" onClick={onOpenSettings}>
        <picture>
          <source srcSet="./img/настройки Ч.svg" media="(prefers-color-scheme: light)" />
          <img src="./img/настройки Б.svg" alt="Фильтры" />
        </picture>
      </button>
    </div>
  );
}

export default SearchBar;