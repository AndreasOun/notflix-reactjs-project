import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './home.css';

function Home() {
  const [movies, setMovies] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Added isLoading state

  const categories = [
    { id: 28, name: 'Action' },
    { id: 16, name: 'Anime' },
    { id: 18, name: 'Drama'},
    { id: 35, name: 'Comedy'},
    { id: 27, name: 'Horror'},  
    { id: 10749, name: 'Romance'},
    { id: 10751, name: 'Family'},
    { id: 36, name: 'History'},
  ];

  useEffect(() => {
    async function fetchData() {
      const API_KEY = '8a4ddcf472e26bea20a3ea9f42810899';
      const fetchedMovies = [];

      const maxPagesPerCategory = 10; // Adjust the number of pages fetched per category

      for (const category of categories) {
        for (let page = 1; page <= maxPagesPerCategory; page++) {
          const movieResponse = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=${category.id}&page=${page}`
          );
          fetchedMovies.push(...movieResponse.data.results);
        }
      }

      setMovies(fetchedMovies);
      setIsLoading(false); // Set isLoading to false when data fetching is complete

      if (fetchedMovies.length > 0) {
        setBackgroundImage(`https://image.tmdb.org/t/p/original/${fetchedMovies[0].backdrop_path}`);
      }
    }

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container">
      {isLoading ? ( // Render loading bar if isLoading is true
        <div className="loading-bar">
          <div className="progress"></div>
        </div>
      ) : (
        <div>
          <div className="hero" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <h1>Welcome to Notlfix!</h1>
            <p>Here you can find your favorite movies and TV shows.</p>
          </div>
          <div className="categories">
            {movies.length > 0 &&
              categories.map((category) => (
                <div key={category.id}>
                  <h2>{category.name}</h2>
                  <Slider {...settings}>
                    {movies
                      .filter((movie) => movie.genre_ids.includes(category.id))
                      .map((movie) => (
                        <div key={movie.id} className="movie-card">
                          <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                          <div className="overlay">
                            <h2>{movie.title}</h2>
                            <p>{movie.overview}</p>
                            <button>Watch Now</button>
                          </div>
                        </div>
                      ))}
                  </Slider>
                  <button>Show More</button>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
