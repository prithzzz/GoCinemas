  import React, { useEffect, useState } from 'react';
  import Loading from '../Components/Loading';
  import BlurCircle from '../Components/BlurCircle';
  import isoTimeFormat from '../Components/lib/isoTimeFormat.js'; 

  import { dateFormat } from '../Components/lib/dateFormat.js';

  import './MyBookings.css';
  import { dummyBookingData } from '../assets/assets'; // replace with your actual data import

  const MyBookings = () => {
    const currency = import.meta.env.VITE_CURRENCY;

    const [bookings, setBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const getMyBookings = async () => {
      setBookings(dummyBookingData);
      setIsLoading(false);
    };

    useEffect(() => {
      getMyBookings();
    }, []);

    return !isLoading ? (
      <div className="mybookings-container">
        <BlurCircle top="100px" left="100px" />
        <BlurCircle bottom="0px" left="600px" />

        <h1 className="mybookings-title">My Bookings</h1>

        {bookings.map((item, index) => (
          <div key={index} className="booking-card">
            <div className="booking-left">
              <img
                src={item.show.movie.poster_path}
                alt=""
                className="booking-poster"
              />
              <div className="booking-info">
                <p className="booking-movie-title">{item.show.movie.title}</p>
                <p className="booking-runtime">{isoTimeFormat(item.show.movie.runtime)}</p>
                <p className="booking-date">{dateFormat(item.show.showDateTime)}</p>
              </div>
            </div>

            <div className="booking-right">
              <div className="booking-payment">
                <p className="booking-amount">
                  {currency}
                  {item.amount}
                </p>
                {!item.isPaid && <button className="pay-now-btn">Pay now</button>}
              </div>

              <div className="booking-seats">
                <p>
                  <span className="label">Total tickets:</span> {item.bookedSeats.length}
                </p>
                <p>
                  <span className="label">Seat number:</span> {item.bookedSeats.join(', ')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <Loading />
    );
  };

  export default MyBookings;
