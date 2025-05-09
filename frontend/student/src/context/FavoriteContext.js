import { createContext, useState } from 'react';

export const FavoriteContext = createContext();

export const FavoriteProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [internships, setInternships] = useState([]);

  return (
    <FavoriteContext.Provider value={{ 
      favorites, 
      setFavorites,
      internships,
      setInternships
    }}>
      {children}
    </FavoriteContext.Provider>
  );
};