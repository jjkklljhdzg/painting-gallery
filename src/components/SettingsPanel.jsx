import React from 'react'
import FilterGroup from './FilterGroup'
import '../styles/settingsPanel.css'

function SettingsPanel({ 
  isOpen, 
  onClose,
  setSelectedAuthor,
  setSelectedLocation,
  setDateFrom,
  setDateTo,
  paintings = [] 
}) {
  if (!isOpen) return null

  // ИСПРАВЛЕНО: Собираем список художников через p.artist, а не p.author
  const artistOptions = Array.from(new Set(paintings.map(p => p.artist).filter(Boolean)))
  const locationOptions = Array.from(new Set(paintings.map(p => p.location).filter(Boolean)))

  const handleYearsApply = (type, value) => {
    if (type === 'from') {
      setDateFrom(value)
    } else if (type === 'to') {
      setDateTo(value)
    }
  }

  const handleClear = () => {
    setSelectedAuthor('')
    setSelectedLocation('')
    setDateFrom('')
    setDateTo('')
    window.location.reload()
  }

  return (
    <div className="sett">
      <div className="sett-header">
        <button className="close-sett" onClick={onClose}>
          <img src="./img/крест Б.svg" alt="close" />
        </button>
      </div>
      
      <FilterGroup 
        title="ARTIST" 
        type="select" 
        options={artistOptions}
        onApply={setSelectedAuthor} 
      />
      
      <FilterGroup 
        title="LOCATION" 
        type="select" 
        options={locationOptions}
        onApply={setSelectedLocation} 
      />
      
      <FilterGroup 
        title="YEARS" 
        type="years"
        onApply={handleYearsApply} 
        placeholder={{ from: "From", to: "To" }}
      />
      
      <div className="filter-actions">
        <button className="btn-show" onClick={onClose}>SHOW THE RESULTS</button>
        <button className="btn-clear" onClick={handleClear}>CLEAR</button>
      </div>
    </div>
  )
}

export default SettingsPanel