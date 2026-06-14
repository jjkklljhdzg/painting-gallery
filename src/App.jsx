import React, { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import SettingsPanel from './components/SettingsPanel'
import PaintCard from './components/PaintCard'
import Pagination from './components/Pagination'
import './styles/index.css'

const ITEMS_PER_PAGE = 6

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [theme, setTheme] = useState('dark')
  const [paintings, setPaintings] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  // Стейты для хранения параметров поиска и фильтрации
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')

  useEffect(() => {
    fetch('https://registry.scalar.com/@mail-ufgwz/apis/gallery-api@1.0')
      .then(res => res.json())
      .then(spec => {
        const data = spec.paths['/paintings'].get.responses['200'].content['application/json'].example
        setPaintings(data)
        setLoading(false)
      })
      .catch(console.error)
  }, [])

  useEffect(() => {
    document.body.className = `theme-${theme}`
  }, [theme])

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')

  // ИСПРАВЛЕНО: Фильтрация переписана под ключи вашего API (title, artist, location, year)
  const filteredPaintings = paintings.filter(paint => {
    // 1. Поиск по названию (смотрим в paint.title вместо paint.name)
    const paintTitle = paint.title || ''
    const matchesSearch = paintTitle.toLowerCase().includes(searchQuery.toLowerCase())

    // 2. Фильтр по художнику (смотрим в paint.artist)
    const matchesAuthor = selectedAuthor ? paint.artist === selectedAuthor : true

    // 3. Фильтр по локации (смотрим в paint.location)
    const matchesLocation = selectedLocation ? paint.location === selectedLocation : true

    // 4. Фильтр по годам (смотрим в paint.year вместо paint.created)
    const paintYear = Number(paint.year)
    const matchesDateFrom = dateFrom ? paintYear >= Number(dateFrom) : true
    const matchesDateTo = dateTo ? paintYear <= Number(dateTo) : true

    return matchesSearch && matchesAuthor && matchesLocation && matchesDateFrom && matchesDateTo
  })

  const totalPages = Math.ceil(filteredPaintings.length / ITEMS_PER_PAGE)
  const validCurrentPage = currentPage > totalPages ? 1 : currentPage
  const currentPaintings = filteredPaintings.slice((validCurrentPage - 1) * ITEMS_PER_PAGE, validCurrentPage * ITEMS_PER_PAGE)

  if (loading) return null

  return (
    <>
      <header>
        <button className="theme-toggle" onClick={toggleTheme}>
          <img src={theme === 'dark' ? './img/солнце.svg' : './img/луна.svg'} alt="theme" />
        </button>
      </header>
      
      <main>
        <SearchBar 
          searchQuery={searchQuery}
          onSearchChange={(val) => { setSearchQuery(val); setCurrentPage(1); }}
          onOpenSettings={() => setIsSettingsOpen(true)} 
        />
        
        <SettingsPanel 
          isOpen={isSettingsOpen} 
          onClose={() => setIsSettingsOpen(false)} 
          setSelectedAuthor={(val) => { setSelectedAuthor(val); setCurrentPage(1); }}
          setSelectedLocation={(val) => { setSelectedLocation(val); setCurrentPage(1); }}
          setDateFrom={(val) => { setDateFrom(val); setCurrentPage(1); }}
          setDateTo={(val) => { setDateTo(val); setCurrentPage(1); }}
          paintings={paintings}
        />
        
        <div className="img-container">
          {currentPaintings.length > 0 ? (
            currentPaintings.map((p, idx) => (
              /* ИСПРАВЛЕНО: Передаем p.imageUrl напрямую в проп image */
              <PaintCard key={idx} {...p} image={p.imageUrl} />
            ))
          ) : (
            <p style={{ gridColumn: '1 / -1', textAlign: 'center', marginTop: '40px', opacity: 0.5 }}>
              Ничего не найдено
            </p>
          )}
        </div>
      </main>

      <footer>
        <Pagination 
          currentPage={validCurrentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            setCurrentPage(page)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />
      </footer>
    </>
  )
}

export default App