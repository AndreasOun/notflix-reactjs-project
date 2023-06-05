import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './movieDetails.css';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [cast, setCast] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

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

      // Fetch cast
      const castResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
      );
      setCast(castResponse.data.cast);

      // Fetch reviews
      const reviewsResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
      );
      setReviews(reviewsResponse.data.results);
    }

    fetchMovieDetails();
  }, [id]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  const backgroundStyle = {
    backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.poster_path})`,
  };

  return (
    <div className="movie-details" style={backgroundStyle}>
      <div className="tabs">
        <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => handleTabClick('overview')}>
          OVERVIEW
        </button>
        <button className={activeTab === 'trailer' ? 'active' : ''} onClick={() => handleTabClick('trailer')}>
          TRAILER
        </button>
        <button className={activeTab === 'cast' ? 'active' : ''} onClick={() => handleTabClick('cast')}>
          CAST
        </button>
        <button className={activeTab === 'reviews' ? 'active' : ''} onClick={() => handleTabClick('reviews')}>
          REVIEWS
        </button>
      </div>

      {activeTab === 'overview' && (
        <div className="tab-content">
          <h3>Overview</h3>
          <p>{movie.overview}</p>
        </div>
      )}

      {activeTab === 'trailer' && (
        <div className="tab-content">
          <h3>Trailer</h3>
          {trailerKey && (
            <div className="trailer">
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
      )}

      {activeTab === 'cast' && (
        <div className="tab-content">
          <h3>Cast</h3>
          <ul>
            {cast.map((actor) => (
              <li key={actor.id}>{actor.name}</li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="tab-content">
          <h3>Reviews</h3>
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <p>{review.author}</p>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MovieDetails;
