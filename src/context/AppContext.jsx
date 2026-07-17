import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AppContext = createContext(null)

function readStorage(key, fallback) {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : fallback
  } catch {
    return fallback
  }
}

export function AppProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    readStorage('netflix_auth', false)
  )
  const [myList, setMyList] = useState(() => readStorage('netflix_mylist', []))
  const [selectedMovie, setSelectedMovie] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem('netflix_auth', JSON.stringify(isAuthenticated))
  }, [isAuthenticated])

  useEffect(() => {
    localStorage.setItem('netflix_mylist', JSON.stringify(myList))
  }, [myList])

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

  const login = () => setIsAuthenticated(true)
  const logout = () => {
    setIsAuthenticated(false)
    setMobileMenuOpen(false)
  }

  const toggleMyList = (movieId) => {
    setMyList((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    )
  }

  const isInMyList = (movieId) => myList.includes(movieId)

  const openMovieModal = (movie) => setSelectedMovie(movie)
  const closeMovieModal = () => setSelectedMovie(null)

  const value = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
      myList,
      toggleMyList,
      isInMyList,
      selectedMovie,
      openMovieModal,
      closeMovieModal,
      mobileMenuOpen,
      setMobileMenuOpen,
    }),
    [isAuthenticated, myList, selectedMovie, mobileMenuOpen]
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within AppProvider')
  }
  return context
}
