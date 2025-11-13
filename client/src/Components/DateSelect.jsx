import React, { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import BlurCircle from './BlurCircle';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import './DateSelect.css';

const DateSelect = ({ dateTime, id }) => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(null);

  const onBookHandler = () => {
    if (!selected) {
      return toast('Please select a date');
    }
    navigate(`/movies/${id}/${selected}`);
    scrollTo(0, 0);
  };

  return (
    <div id="dateSelect" className="date-select-container">
      <div className="date-select-box">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle top="100px" right="0px" />

        <div className="date-select-content">
          <p className="date-select-title">Choose Date</p>
          <div className="date-buttons-wrapper">
            <ChevronLeftIcon width={28} className="chevron-icon" />
            <div className="dates-grid">
              {Object.keys(dateTime).map((date) => (
                <button
                  key={date}
                  onClick={() => setSelected(date)}
                  className={`date-btn ${selected === date ? 'selected' : ''}`}
                >
                  <span>{new Date(date).getDate()}</span>
                  <span>{new Date(date).toLocaleDateString('en-US', { month: 'short' })}</span>
                </button>
              ))}
            </div>
            <ChevronRightIcon width={28} className="chevron-icon" />
          </div>
        </div>

        <button onClick={onBookHandler} className="book-now-btn">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DateSelect;
