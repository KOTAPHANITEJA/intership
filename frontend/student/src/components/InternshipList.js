import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { FavoriteContext } from '../context/FavoriteContext';

const InternshipList = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, setFavorites } = useContext(FavoriteContext);

  useEffect(() => {
    fetchInternships();
  }, []);

  const fetchInternships = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/internships');
      setInternships(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch internships');
      setLoading(false);
    }
  };

  const toggleFavorite = async (id, isFavourite) => {
    try {
      const response = await axios.put(`http://localhost:5000/api/internships/${id}`, {
        isFavourite: !isFavourite
      });
      setInternships(internships.map(internship => 
        internship._id === id ? response.data : internship
      ));
    } catch (err) {
      setError('Failed to update favorite status');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="internship-list">
      {internships.map((internship) => (
        <div key={internship._id} className="internship-card">
          <h3>{internship.company}</h3>
          <p className="role">Role: {internship.role}</p>
          <p className="duration">Duration: {internship.duration}</p>
          <button
            className="favorite-btn"
            onClick={() => toggleFavorite(internship._id, internship.isFavourite)}
          >
            {internship.isFavourite ? '❤️' : '🤍'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default InternshipList;