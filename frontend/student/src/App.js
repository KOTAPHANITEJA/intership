import React, { useState } from 'react';
import { FavoriteProvider } from './context/FavoriteContext';
import InternshipList from './components/InternshipList';
import Favorites from './components/Favorites';
import './App.css';

function App() {
  const [showFavorites, setShowFavorites] = useState(false);

  return (
    <FavoriteProvider>
      <div className="App">
        <header className="App-header">
          <h1>Student Internship Portal</h1>
          <button 
            className="nav-btn"
            onClick={() => setShowFavorites(!showFavorites)}
          >
            {showFavorites ? 'View All Internships' : 'View Favorites'}
          </button>
        </header>
        <main>
          {showFavorites ? (
            <Favorites onBackClick={() => setShowFavorites(false)} />
          ) : (
            <InternshipList onFavoritesClick={() => setShowFavorites(true)} />
          )}
        </main>
      </div>
    </FavoriteProvider>
  );
}

export default App;