import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FavoriteContext } from '../context/FavoriteContext';

const InternshipList = ({ onFavoritesClick }) => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, setFavorites, setInternships: setContextInternships } = useContext(FavoriteContext);

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      console.log('Fetching internships...');
      const response = await axios.get('http://localhost:5000/api/internships');
      console.log('Received data:', response.data);
      setInternships(response.data);
      setContextInternships(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Failed to fetch internships');
      setLoading(false);
    }
  };

  const toggleFavorite = async (id, isFavourite) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/internships/${id}`, {
        isFavourite: !isFavourite
      });
      
      const updatedInternships = internships.map(internship => 
        internship._id === id ? response.data : internship
      );
      
      setInternships(updatedInternships);
      setContextInternships(updatedInternships);
      
      // Update favorites list
      if (!isFavourite) {
        setFavorites([...favorites, response.data]);
      } else {
        setFavorites(favorites.filter(fav => fav._id !== id));
      }
    } catch (err) {
      console.error('Update error:', err);
      setError('Failed to update favorite status');
    }
  };

  if (loading) return <div className="loading">Loading internships...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!internships.length) return <div className="no-data">No internships available</div>;

  return (
    <div>
      <div className="list-header">
        <h2>Available Internships</h2>
        <button className="nav-btn" onClick={onFavoritesClick}>
          View Favorites ({favorites.length}) ❤️
        </button>
      </div>
      <div className="internship-list">
        {internships.map((internship) => (
          <div key={internship._id} className="internship-card">
            <h3>{internship.company}</h3>
            <p className="role">Role: {internship.role}</p>
            <p className="duration">Duration: {internship.duration}</p>
            <button
              className="favorite-btn"
              onClick={() => toggleFavorite(internship._id, internship.isFavourite)}
              aria-label={internship.isFavourite ? "Remove from favorites" : "Add to favorites"}
            >
              {internship.isFavourite ? '❤️' : '🤍'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InternshipList;