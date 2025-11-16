import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyShowsData } from "../assets/assets";
import "./PaymentPage.css";

const PaymentPage = () => {
  const { id, date, time } = useParams();
  const navigate = useNavigate();

  const movie = dummyShowsData.find((m) => m._id === id);

  const handlePayment = (method) => {
    navigate(`/booking-confirmation/${id}/${date}/${time}/${method}`);
    scrollTo(0, 0);
  };

  if (!movie) return <h1 className="pay-error">Movie not found</h1>;

  return (
    <div className="pay-container">
      <div className="pay-left">
        <h1 className="pay-title">Checkout</h1>

        <h2 className="pay-sub">Contact Information</h2>

        <div className="ticket-section">
          <p className="ticket-label">Ticket 1</p>

          <div className="input-row">
            <input placeholder="First name*" />
            <input placeholder="Last name*" />
          </div>

          <input placeholder="Phone number*" />
          <input placeholder="Email Address*" />
        </div>

        <div className="ticket-section">
          <p className="ticket-label">Ticket 2</p>

          <div className="input-row">
            <input placeholder="First name*" />
            <input placeholder="Last name*" />
          </div>

          <input placeholder="Phone number*" />
        </div>

        <p className="ticket-label">Payment Method</p>
        <select className="pay-select">
          <option>Card</option>
          <option>UPI</option>
        </select>

        <div className="pay-btns">
          <button className="upi-btn" onClick={() => handlePayment("upi")}>
            Pay with UPI
          </button>

          <button className="card-btn" onClick={() => handlePayment("card")}>
            Pay by Card
          </button>
        </div>
      </div>

      <div className="pay-right">
        <img src={movie.poster_path} alt="movie poster" className="pay-poster" />

        <div className="summary-box">
          <h2 className="summary-title">Order Summary</h2>

          <div className="summary-row">
            <p>2 x Regular seat</p>
            <p>Rs.400</p>
          </div>

          <div className="summary-row">
            <p>Delivery - eTicket</p>
            <p>Rs.0</p>
          </div>

          <hr />

          <div className="summary-total">
            <p>Total</p>
            <p>Rs.400</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
