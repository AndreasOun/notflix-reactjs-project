import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';

function Home() {
  const [movies, setMovies] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    async function fetchData() {
      const API_KEY = '8a4ddcf472e26bea20a3ea9f42810899';
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
      setMovies(response.data.results);
      if (response.data.results.length > 0) {
        setBackgroundImage(`https://image.tmdb.org/t/p/original/${response.data.results[0].backdrop_path}`);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="hero" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <h1>Welcome to Notlfix!</h1>
        <p>Here you can find your favorite movies and TV shows.</p>
      </div>
      <ul className="movie-list">
        {movies.map(movie => (
          <li key={movie.id} className="movie-card">
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
            <div className="overlay">
              <h2>{movie.title}</h2>
              <p>{movie.overview}</p>
              <button>Watch Now</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
