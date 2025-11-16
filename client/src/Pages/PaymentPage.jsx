import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { dummyShowsData } from "../assets/assets";
import BlurCircle from "../Components/BlurCircle";
import "./PaymentPage.css";

const PaymentPage = () => {
  const { id, date, time } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const seats = location.state?.seats || [];
  const pricing = location.state?.pricing || [];

  const movie = dummyShowsData.find((m) => m._id === id);
  const total = pricing.reduce((sum, s) => sum + s.price, 0);

  // Single Contact Info Form
  const [contact, setContact] = useState({
    fName: "",
    lName: "",
    phone: "",
    email: "",
  });

  const [selectedMethod, setSelectedMethod] = useState(null);
  const [error, setError] = useState("");

  const validatePhone = (num) => /^\d{10}$/.test(num);

  const validateForm = () => {
    if (!contact.fName || !contact.lName || !contact.phone || !contact.email)
      return "Please fill all contact details.";

    if (!validatePhone(contact.phone))
      return "Phone number must be 10 digits.";

    if (!selectedMethod)
      return "Please choose a payment method.";

    return null;
  };

  const proceedToPayment = () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    navigate(
      `/booking-confirmation/${id}/${date}/${time}/${selectedMethod}`,
      { state: { seats, pricing, total } }
    );

    scrollTo(0, 0);
  };

  if (!movie) return <h1 className="pay-error">Movie not found</h1>;

  return (
    <div className="pay-container">
      <BlurCircle top="150px" left="0px" />
      <BlurCircle bottom="0px" right="150px" />

      {/* LEFT SIDE */}
      <div className="pay-left">
        <h1 className="pay-title">Checkout</h1>
        <h2 className="pay-subtitle">Contact Information</h2>

        {/* SINGLE CONTACT FORM */}
        <div className="ticket-block">
          <div className="row-2">
            <input
              className="pay-input"
              placeholder="First name*"
              value={contact.fName}
              onChange={(e) => setContact({ ...contact, fName: e.target.value })}
            />
            <input
              className="pay-input"
              placeholder="Last name*"
              value={contact.lName}
              onChange={(e) => setContact({ ...contact, lName: e.target.value })}
            />
          </div>

          <input
            className="pay-input"
            placeholder="Phone number*"
            maxLength={10}
            value={contact.phone}
            onChange={(e) =>
              setContact({ ...contact, phone: e.target.value })
            }
          />

          <input
            className="pay-input"
            placeholder="Email Address*"
            value={contact.email}
            onChange={(e) =>
              setContact({ ...contact, email: e.target.value })
            }
          />
        </div>

        {/* PAYMENT METHOD BUTTONS */}
        <p className="ticket-title">Choose Payment Method</p>

        <div className="pay-btns">
          <button
            className={`upi-btn pay-method-btn ${
              selectedMethod === "upi" ? "active-method" : ""
            }`}
            onClick={() => setSelectedMethod("upi")}
          >
            Pay with UPI
          </button>

          <button
            className={`card-btn pay-method-btn ${
              selectedMethod === "card" ? "active-method" : ""
            }`}
            onClick={() => setSelectedMethod("card")}
          >
            Pay by Card
          </button>

          {/* ERROR */}
          {error && <p className="pay-error-text">{error}</p>}

          {/* PROCEED */}
          <button className="confirm-pay-btn" onClick={proceedToPayment}>
            Proceed to Payment
          </button>
        </div>
      </div>

      {/* RIGHT SIDE SUMMARY */}
      <div className="pay-right">
        <img src={movie.poster_path} alt="" className="pay-poster" />

        <div className="summary-box">
          <h2 className="summary-title">Order Summary</h2>

          {pricing.map((item) => (
            <div className="summary-row" key={item.seat}>
              <p>{item.seat}</p>
              <p>₹{item.price}</p>
            </div>
          ))}

          <hr />

          <div className="summary-total">
            <p>Total</p>
            <p>₹{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
