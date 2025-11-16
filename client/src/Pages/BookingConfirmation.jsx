import React from "react";
import { useParams } from "react-router-dom";
import { dummyShowsData } from "../assets/assets";
import "./BookingConfirmation.css";

const BookingConfirmation = () => {
  const { id, date, time, method } = useParams();
  const movie = dummyShowsData.find((m) => m._id === id);

  if (!movie) return <h1 className="confirm-error">Movie not found</h1>;

  return (
    <div className="confirm-container">
      <h1 className="confirm-title">Ticket Confirmation</h1>

      <div className="confirm-content">
        <div className="confirm-left">
          <img src={movie.poster_path} alt="" className="confirm-poster" />

          <div className="movie-info-block">
            <p className="label">Movie</p>
            <p className="value">{movie.title}</p>

            <p className="label">Date</p>
            <p className="value">{new Date(date).toDateString()}</p>

            <div className="info-row">
              <div>
                <p className="label">Class</p>
                <p className="value">GOLD CLASS 2D</p>
              </div>

              <div>
                <p className="label">Time</p>
                <p className="value">
                  {new Date(time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            <p className="label">Tickets (3)</p>
            <p className="value">C8, C9, C10</p>
          </div>
        </div>

        <div className="confirm-right">
          <div className="order-box">
            <h2>Order Details</h2>

            <div className="order-row">
              <p>Ticket</p>
              <p>Rs.200 ×3</p>
            </div>

            <div className="order-row">
              <p>Convenience fees</p>
              <p>Rs.25 ×3</p>
            </div>

            <hr />

            <div className="order-row">
              <p>Promo & Voucher</p>
              <p>- Rs.149</p>
            </div>

            <hr />

            <div className="order-total">
              <p>Total</p>
              <p>Rs.526.00</p>
            </div>

            <p className="label">Payment Method</p>
            <p className="value">
              {method === "card"
                ? "Card"
                : method === "upi"
                ? "UPI"
                : "Unknown"}
            </p>
          </div>

          <div className="qr-box">
            <p>QR</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
