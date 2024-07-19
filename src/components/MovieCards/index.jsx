import React from 'react';
import "./index.css"

const MovieCards = ({ image, title, author, year }) => {
  return (
    <div className="card">
      <img src={image} alt="Random Dog"  className='dog-images'/>
      <h3 className='text'>Title:{title}</h3>
      <p className='text'>Author: {author}</p>
      <p>{year}</p>
    </div>
  );
};

export default MovieCards;
