import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './movieDetails.css';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    async function fetchMovieDetails() {
      const API_KEY = '8a4ddcf472e26bea20a3ea9f42810899';

      // Fetch movie details
      const movieResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
      );
      setMovie(movieResponse.data);

      // Fetch movie trailer
      const trailerResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
      );
      if (trailerResponse.data.results.length > 0) {
        setTrailerKey(trailerResponse.data.results[0].key);
      }
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
      <p>Runtime: {movie.runtime} minutes</p>
      <p>Genres: {movie.genres.map((genre) => genre.name).join(', ')}</p>
      <p>Production Companies: {movie.production_companies.map((company) => company.name).join(', ')}</p>
      <p>Tagline: {movie.tagline}</p>
      <p>Original Language: {movie.original_language}</p>

      {trailerKey && (
        <div className="trailer">
          <h3>Trailer</h3>
          <iframe
            title="Movie Trailer"
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${trailerKey}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
