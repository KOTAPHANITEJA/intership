import React, { useContext } from 'react';
import { FavoriteContext } from '../context/FavoriteContext';

const Favorites = ({ onBackClick }) => {
  const { favorites, internships } = useContext(FavoriteContext);

  return (
    <div>
      <div className="favorites-header">
        <h2>Favorite Internships</h2>
        <button className="back-btn" onClick={onBackClick}>
          Back to All Internships
        </button>
      </div>
      <div className="internship-list">
        {internships
          .filter(internship => internship.isFavourite)
          .map((internship) => (
            <div key={internship._id} className="internship-card">
              <h3>{internship.company}</h3>
              <p className="role">Role: {internship.role}</p>
              <p className="duration">Duration: {internship.duration}</p>
              <button className="favorite-btn">❤️</button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Favorites;