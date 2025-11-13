import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { dummyDateTimeData, dummyShowsData } from '../assets/assets';
import { StarIcon } from 'lucide-react';
import BlurCircle from '../Components/BlurCircle';
import timeFormat from '../Components/lib/timeFormat.js';
import DateSelect from '../Components/DateSelect';
import Loading from '../Components/Loading';
import "./MovieDetails.css";


const MovieDetails = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);

  const getShow = async () => {
    const selectedShow = dummyShowsData.find((s) => s._id === id);
    if (selectedShow) {
      setShow({
        movie: selectedShow,
        dateTime: dummyDateTimeData,
      });
    }
  };

  useEffect(() => {
    getShow();
  }, [id]);

  return show ? (
    <div className="movie-details-container">
      <div className="movie-details-inner">
        <img
          src={show.movie.poster_path}
          alt={show.movie.title}
          className="movie-poster"
        />

        <div className="movie-info">
          <BlurCircle top="100px" left="-100px" />
          <p className="language-tag">English</p>
          <h1 className="movie-title">{show.movie.title}</h1>

          <div className="rating">
            <StarIcon />
            {show.movie.vote_average.toFixed(1)} User rating
          </div>

          <p className="overview">{show.movie.overview}</p>

          <p className="movie-meta">
            {timeFormat(show.movie.runtime)} ●{' '}
            {show.movie.genres.map((genre) => genre.name).join(',')} ●{' '}
            {show.movie.release_date.split('-')[0]}
          </p>

          <div className="book-button">
            <a href="#dateSelect">Book Tickets</a>
          </div>
        </div>
      </div>

      <DateSelect dateTime={show.dateTime} id={id} />
    </div>
  ) : (
    <Loading />
  );
};

export default MovieDetails;
