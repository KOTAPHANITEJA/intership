import React from 'react';
import { FavoriteProvider } from './context/FavoriteContext';
import InternshipList from './components/InternshipList';
import './App.css';

function App() {
  return (
    <FavoriteProvider>
      <div className="App">
        <header className="App-header">
          <h1>Student Internship Portal</h1>
        </header>
        <main>
          <InternshipList />
        </main>
      </div>
    </FavoriteProvider>
  );
}

export default App;