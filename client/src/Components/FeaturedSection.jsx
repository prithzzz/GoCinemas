import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BlurCircle from './BlurCircle';
import MovieCard from './MovieCard';
import './FeaturedSection.css';
import { dummyShowsData } from '../assets/assets'; // ✅ correct import

const FeaturedSection = ({ timeFormat }) => {  // ✅ removed dummyShowsData prop
  const navigate = useNavigate();

  return (
    <div className="featured-section">
      <div className="featured-header">
        <BlurCircle top="0" right="-80px" />
        <p className="featured-title">Now Showing</p>
        <button onClick={() => navigate('/movies')} className="view-all-btn">
          View all
          <ArrowRight className="arrow-icon" />
        </button>
      </div>

      <div className="featured-movies">
        {dummyShowsData.slice(0, 4).map((show) => (
          <MovieCard key={show._id} movie={show} timeFormat={timeFormat} />
        ))}
      </div>

      <div className="featured-footer">
        <button
          onClick={() => {
            navigate('/movies');
            scrollTo(0, 0);
          }}
          className="show-more-btn"
        >
          Show more
        </button>
      </div>
    </div>
  );
};

export default FeaturedSection;
