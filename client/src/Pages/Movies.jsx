import React from 'react';
import { dummyShowsData } from '../assets/assets';
import MovieCard from '../Components/MovieCard';
import BlurCircle from '../Components/BlurCircle';
import './Movies.css';

const Movies = () => {
  return dummyShowsData.length > 0 ? (
    <div className="movies-container">
      <BlurCircle top="150px" left="0px" />
      <BlurCircle bottom="50px" right="50px" />

      <h1 className="movies-heading">Now Showing</h1>
      <div className="movies-list">
        {dummyShowsData.map((movie) => (
          <MovieCard movie={movie} key={movie._id} />
        ))}
      </div>
    </div>
  ) : (
    <div className="movies-empty">
      <h1>No Movies</h1>
    </div>
  );
};

export default Movies;
