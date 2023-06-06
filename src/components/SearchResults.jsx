import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import './searchresults.css';

function SearchResults() {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const apiKey = '8a4ddcf472e26bea20a3ea9f42810899';
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`
        );
        const data = await response.json();
        setSearchResults(data.results);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchSearchResults();
  }, [searchQuery]);

  return (
    <div>
      <h2>Search Results for "{searchQuery}":</h2>
      <div className="movie-card-list">
        {searchResults.map((movie) => (
          <Link to={`/movies/${movie.id}`} key={movie.id} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            <div className="overlay">
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
