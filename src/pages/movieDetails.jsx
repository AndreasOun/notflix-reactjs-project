import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './movieDetails.css';
import { useParams } from 'react-router-dom'; // Import the useParams hook

function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const { id } = useParams(); // Destructure the id from the URL parameters

  useEffect(() => {
    async function fetchMovieDetails() {
      const API_KEY = '8a4ddcf472e26bea20a3ea9f42810899';
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      setMovie(response.data);
    }

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details">
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>
    </div>
  );
}

export default MovieDetails;
