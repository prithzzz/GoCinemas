import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { dummyShowsData } from "../assets/assets";
import BlurCircle from "../Components/BlurCircle";
import "./BookingConfirmation.css";

const BookingConfirmation = () => {
  const { id, date, time, method } = useParams();
  const location = useLocation();

  const seats = location.state?.seats || [];
  const pricing = location.state?.pricing || [];
  const total = location.state?.total || 0;

  const movie = dummyShowsData.find((m) => m._id === id);

  if (!movie) return <h1 className="confirm-error">Movie not found</h1>;

  return (
    <div className="confirm-container">

      {/* Theme blur circles */}
      <BlurCircle top="150px" left="0px" />
      <BlurCircle bottom="0px" right="150px" />

      <h1 className="confirm-title">Ticket Confirmation</h1>

      <div className="confirm-content">

        {/* LEFT — MOVIE DETAILS */}
        <div className="confirm-left">
          <img src={movie.poster_path} alt="" className="confirm-poster" />

          <div className="details-block">
            <p className="label">Movie</p>
            <p className="value">{movie.title}</p>

            <p className="label">Date</p>
            <p className="value">{new Date(date).toDateString()}</p>

            <div className="row-split">
              <div>
                <p className="label">Class</p>
                <p className="value">GOLD CLASS 2D</p>
              </div>

              <div>
                <p className="label">Time</p>
                <p className="value">
                  {new Date(time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  })}
                </p>
              </div>
            </div>

            <p className="label">Tickets ({seats.length})</p>
            <p className="value seats-value">{seats.join(", ")}</p>
          </div>
        </div>

        {/* RIGHT — ORDER SUMMARY */}
        <div className="confirm-right">
          <div className="order-box">
            <h2 className="order-title">Order Details</h2>

            {/* Individual seats + pricing */}
            {pricing.map((item) => (
              <div className="order-row" key={item.seat}>
                <p>{item.seat}</p>
                <p>₹{item.price}</p>
              </div>
            ))}

            <hr />

            <div className="order-total">
              <p>Total</p>
              <p>₹{total}</p>
            </div>

            <p className="label pay-label">Payment Method</p>
            <p className="value">
              {method === "card" ? "Card" : method === "upi" ? "UPI" : "Unknown"}
            </p>
          </div>

          {/* QR BOX placeholder */}
          <div className="qr-box">
            <p>QR</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
