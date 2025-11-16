import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StarIcon } from 'lucide-react';
import './MovieCard.css';
import timeFormat from '../Components/lib/timeFormat.js';
import { useAppContext } from '../context/AppContext.jsx';


const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const {image_base_url} = useAppContext()

  return (
    <div className="movie-card">
      <img
        onClick={() => {
          navigate(`/movies/${movie._id}`);
          scrollTo(0, 0);
        }}
        src={movie.backdrop_path}
        alt={movie.title}
        className="movie-image"
      />

      <p className="movie-title">{movie.title}</p>

      <p className="movie-details">
        {new Date(movie.release_date).getFullYear()} ●{' '}
        {movie.genres.slice(0, 2).map((genre) => genre.name).join(' | ')} ●{' '}
        {timeFormat(movie.runtime)}
      </p>

      <div className="movie-footer">
        <button
          onClick={() => {
            navigate(`/movies/${movie._id}`);
            scrollTo(0, 0);
          }}
          className="buy-btn"
        >
          Buy Tickets
        </button>

        <p className="movie-rating">
          <StarIcon className="star-icon" />
          {movie.vote_average.toFixed(1)}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
