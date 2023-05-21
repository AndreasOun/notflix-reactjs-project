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
      const fetchedMovies = response.data.results;
  
      // Fetch additional pages of movies
      for (let page = 2; page <= 50; page++) { 
        const nextPageResponse = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
        const nextPageMovies = nextPageResponse.data.results;
        fetchedMovies.push(...nextPageMovies);
      }
  
      setMovies(fetchedMovies);
  
      if (fetchedMovies.length > 0) {
        setBackgroundImage(`https://image.tmdb.org/t/p/original/${fetchedMovies[0].backdrop_path}`);
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
      <div className="categories">
        <h2>Action</h2>
        <ul className="movie-list">
          {movies
            .filter((movie) => movie.genre_ids.includes(28))
            .map((movie) => (
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
        <h2>Anime</h2>
        <ul className="movie-list">
          {movies
            .filter((movie) => movie.genre_ids.includes(16))
            .map((movie) => (
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
    </div>
  );
}

export default Home;
