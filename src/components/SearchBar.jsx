import React from 'react'
import '../styles/searchBar.css'

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
        <img src="./img/настройки.svg" alt="Фильтры" />
      </button>
    </div>
  )
}

export default SearchBar