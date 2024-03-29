import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './home.css';
import { Link } from 'react-router-dom';

function Home() {
  const [movies, setMovies] = useState([]);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const movieSliderRef = useRef(null);
  const [isSliderRendered, setIsSliderRendered] = useState(false);

  

  const categories = [
    { id: 16, name: 'Animation' },
    { id: 28, name: 'Action' },
    { id: 18, name: 'Drama' },
    { id: 35, name: 'Comedy' },
    { id: 27, name: 'Horror' },
    { id: 10749, name: 'Romance' },
    { id: 10751, name: 'Family' },
    { id: 36, name: 'History' },
  ];



 useEffect(() => {
    async function fetchData() {
      const API_KEY = '8a4ddcf472e26bea20a3ea9f42810899';
      const fetchedMovies = [];

      for (const category of categories) {
        for (let page = 1; page <= 5; page++) {
          const movieResponse = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_genres=${category.id}&page=${page}`
          );
          fetchedMovies.push(...movieResponse.data.results);
        }
      }

      setMovies(fetchedMovies);

      if (fetchedMovies.length > 0) {
        setBackgroundImage(`https://image.tmdb.org/t/p/original/${fetchedMovies[0].backdrop_path}`);
      }

      setIsLoading(false);
    }

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    className: 'custom-carousel',
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

  const handleMouseUp = (event) => {
    if (event.button === 0) {
      if (movieSliderRef.current) {
        movieSliderRef.current.innerSlider.list.style.pointerEvents = 'auto';
      }
    }
  };
  const handleMouseDown = (event) => {
    // Prevent default action of the left mouse button
    if (event.button === 0) {
      event.preventDefault();
      if (movieSliderRef.current) {
        movieSliderRef.current.innerSlider.list.style.pointerEvents = 'none';
      }
    }
  };


  useEffect(() => {
    setIsSliderRendered(true);
  }, []);
  
  // Render the Slider component only if it is not rendered yet
  if (!isSliderRendered) {
    return null;
  }
  
  return (
    <div className="container">
      {isLoading ? (
        <div className="loading-bar-container">
          <div className="loading-bar" />
        </div>
      ) : (
        <div className="hero" style={{ backgroundImage: `url(${backgroundImage})` }}>
          <h1>Featured Movie:</h1>
          <h1>{movies.length > 0 && movies[0].title}</h1>
        </div>
      )}
      <div className="categories">
      {movies.length > 0 &&
          categories.map((category) => (
            <div key={category.id}>
              <h2>{category.name}</h2>
              <Slider {...settings} className="movie-list custom-carousel" ref={(ref) => (movieSliderRef.current = ref)}>
                {movies
                  .filter((movie) => movie.genre_ids.includes(category.id))
                  .map((movie) => (
                    <Link to={`/movies/${movie.id}`} className="movie-card" onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
                      <div>
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                      </div>
                      <div className="overlay"></div>
                    </Link>
                  ))}
              </Slider>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
