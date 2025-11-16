import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { assets, dummyShowsData, dummyDateTimeData } from "../assets/assets";
import Loading from "../Components/Loading";
import { ArrowRightIcon, ClockIcon } from "lucide-react";
import isoTimeFormat from "../Components/lib/isoTimeFormat";
import BlurCircle from "../Components/BlurCircle";
import toast from "react-hot-toast";
import "./SeatLayout.css";

const SeatLayout = () => {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const { id, date } = useParams();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);

  const navigate = useNavigate();

  const getShow = async () => {
    const foundShow = dummyShowsData.find((s) => s._id === id);
    if (foundShow) {
      setShow({ movie: foundShow, dateTime: dummyDateTimeData });
    }
  };

  const handleSeatClick = (seatId) => {
    if (!selectedTime) return toast("Please select time first");

    if (!selectedSeats.includes(seatId) && selectedSeats.length >= 5)
      return toast("You can only select 5 seats");

    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((s) => s !== seatId)
        : [...prev, seatId]
    );
  };

  const seatPrice = (seatId) => {
    const row = seatId.charAt(0);
    return row === "I" || row === "J" ? 400 : 300;
  };

  const proceedToPayment = () => {
    if (!selectedTime) {
      toast("Please select time");
      return;
    }

    if (selectedSeats.length === 0) {
      toast("Please select a seat");
      return;
    }

    const pricing = selectedSeats.map((seat) => ({
      seat,
      price: seatPrice(seat),
    }));

    navigate(`/payment/${id}/${date}/${selectedTime.time}`, {
      state: { seats: selectedSeats, pricing },
    });

    scrollTo(0, 0);
  };

  useEffect(() => {
    getShow();
  }, [id]);

  if (!show) return <Loading />;

  return (
    <div className="seat-layout-container">
      {/* TIMINGS */}
      <div className="timings-container">
        <p className="timings-title">Available timings</p>
        <div className="timings-list">
          {show.dateTime[date].map((item) => (
            <div
              key={item.time}
              onClick={() => setSelectedTime(item)}
              className={`timing-item ${
                selectedTime?.time === item.time ? "selected-time" : ""
              }`}
            >
              <ClockIcon className="clock-icon" />
              <p className="time-text">{isoTimeFormat(item.time)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SEATS */}
      <div className="seats-main">
        <BlurCircle top="-100px" left="-100px" />
        <BlurCircle bottom="0" right="0" />

        <h1 className="seats-title">Select your seat</h1>
        <img src={assets.screenImage} alt="screen" className="screen-img" />
        <p className="screen-text">SCREEN SIDE</p>

        {/* ₹300 seats */}
        <div className="price-row">
          <p className="price-label">₹300</p>
          <div className="seat-block">
            {rows.slice(0, 8).map((row) => (
              <div key={row} className="seat-row">
                <div className="seat-group">
                  {Array.from({ length: 9 }, (_, i) => {
                    const seatId = `${row}${i + 1}`;
                    return (
                      <button
                        key={seatId}
                        onClick={() => handleSeatClick(seatId)}
                        className={`seat-btn ${
                          selectedSeats.includes(seatId) ? "selected" : ""
                        }`}
                      >
                        {seatId}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ₹400 seats */}
        <div className="price-row">
          <p className="price-label">₹400</p>
          <div className="seat-block">
            {rows.slice(8).map((row) => (
              <div key={row} className="seat-row">
                <div className="seat-group">
                  {Array.from({ length: 9 }, (_, i) => {
                    const seatId = `${row}${i + 1}`;
                    return (
                      <button
                        key={seatId}
                        onClick={() => handleSeatClick(seatId)}
                        className={`seat-btn ${
                          selectedSeats.includes(seatId) ? "selected" : ""
                        }`}
                      >
                        {seatId}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BUTTON */}
        <button onClick={proceedToPayment} className="checkout-btn">
          Proceed to Checkout
          <ArrowRightIcon strokeWidth={3} className="arrow-icon" />
        </button>
      </div>
    </div>
  );
};

export default SeatLayout;
