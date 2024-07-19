import React, { useEffect, useState } from 'react';
import MovieCards from '../MovieCards';

import "./index.css"

const MovieList = ({ movies }) => {
  const [movieData, setMovieData] = useState([]);
  const [loading,setLoading]=useState(false);

   const fetchRandomDogImage = async () => {
    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();

    return data.message;
  };

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      const dataWithImages = await Promise.all(movies.map(async (movie) => {
        const image = await fetchRandomDogImage();
        return { ...movie, image };
      }));
      setMovieData(dataWithImages);
      setLoading(false);
    };

    fetchImages();
  }, [movies]);

  return (
    <div className="movie-list">

      {loading && <p className='loading'>loading Images...</p>}
      {
        !loading && movieData.map((movie, index) => (
          <MovieCards 
            key={index}
            image={movie.image}
            title={movie.title}
            author={movie.author}
            year={movie.publishedDate}
          />
        ))
      }
      
    </div>
  );
};

export default MovieList;
