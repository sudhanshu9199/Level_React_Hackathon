import React, { createContext, useContext, useState } from 'react'
const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
    const [searchTerm, setsearchTerm] = useState('');
  return (
    <SearchContext.Provider value={{ searchTerm, setsearchTerm}}>
        {children}
    </SearchContext.Provider>
  )
}

export const useSearch = () => useContext(SearchContext);