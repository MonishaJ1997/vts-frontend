import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PaymentStep.css";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://127.0.0.1:8000";

const PaymentStep = () => {
  const [methods, setMethods] = useState([]);
  const [selected, setSelected] = useState("");
  const [upi, setUpi] = useState("");
  const [showSuccess, setShowSuccess] = useState(false); // ✅ FIXED POSITION
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BASE_URL}/api/payment-methods/`)
      .then(res => setMethods(res.data))
      .catch(() => {});
  }, []);

  const grouped = methods.reduce((acc, item) => {
    acc[item.method_type] = acc[item.method_type] || [];
    acc[item.method_type].push(item);
    return acc;
  }, {});

  const handlePay = () => {
    if (selected === "upi" && !upi) {
      alert("Please enter UPI ID");
      return;
    }

    setShowSuccess(true); // ✅ SHOW POPUP
  };

  return (
    <>
      <div className="payment-wrapper">

        <h4 className="payment-title">Choose Your Payment Option</h4>

        <div className="payment-layout">

          {/* LEFT */}
          <div className="amount-box">
            <div><span>Course Amount</span><span>₹30,000</span></div>
            <div><span>GST</span><span>₹1,000</span></div>
            <hr />
            <div className="total"><span>Total</span><span>₹31,000</span></div>
          </div>

          {/* RIGHT */}
          <div className="payment-options">

            {/* UPI */}
            <div
              className={`payment-card ${selected === "upi" ? "active" : ""}`}
              onClick={() => setSelected("upi")}
            >
              <div className="radio-outer">
                {selected === "upi" && <div className="radio-inner" />}
              </div>

              <div className="icons">
                {grouped.upi?.map(icon => (
                  <img
                    key={icon.id}
                    src={`${BASE_URL}${icon.icon}`}
                    alt={icon.title}
                  />
                ))}
              </div>

              <span className="method-name">UPI</span>
            </div>

            {/* NET BANKING */}
            <div
              className={`payment-card ${selected === "netbanking" ? "active" : ""}`}
              onClick={() => setSelected("netbanking")}
            >
              <div className="radio-outer">
                {selected === "netbanking" && <div className="radio-inner" />}
              </div>

              <div className="icons">
                {grouped.netbanking?.map(icon => (
                  <img
                    key={icon.id}
                    src={`${BASE_URL}${icon.icon}`}
                    alt={icon.title}
                  />
                ))}
              </div>

              <span className="method-name">Net Banking</span>
            </div>

            {/* CARD */}
            <div
              className={`payment-card ${selected === "card" ? "active" : ""}`}
              onClick={() => setSelected("card")}
            >
              <div className="radio-outer">
                {selected === "card" && <div className="radio-inner" />}
              </div>

              <div className="icons">
                {grouped.card?.map(icon => (
                  <img
                    key={icon.id}
                    src={`${BASE_URL}${icon.icon}`}
                    alt={icon.title}
                  />
                ))}
              </div>

              <span className="method-name">Card</span>
            </div>

            {/* UPI INPUT + BUTTON */}
            {selected === "upi" && (
              <div className="upi-row">
                <div className="upi-box">
                  <label>Enter UPI ID</label>
                  <input
                    placeholder="example@ybl"
                    value={upi}
                    onChange={(e) => setUpi(e.target.value)}
                  />
                </div>

                <button className="pay-btn" onClick={handlePay}>
                  Pay Now
                </button>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* ✅ SUCCESS POPUP */}
      {showSuccess && (
        <div className="payment-modal">
          <div className="payment-modal-content">

            <span
  className="close-btn"
  onClick={() => {
    setShowSuccess(false);
    navigate("/");
  }}
>
  ✕
</span>
            <div className="success-icon">✔</div>

            <h2>Payment Completed</h2>

            <div className="transaction-box">
              <h3>Transaction Details</h3>

              <div className="rows">
                <span>Transaction Id</span>
                <span>:</span>
                <span>GDHS200001</span>
              </div>

              <div className="rows">
                <span>Date</span>
                <span>:</span>
                <span> 02/04/2026</span>
              </div>

              <div className="rows">
                <span>Payment Method</span>
                <span>:</span>
                <span> {selected === "upi" ? "Google Pay" : selected}</span>
              </div>

              <div className="rows">
                <span>Amount Paid</span>
                <span>:</span>
                <span> ₹31,000</span>
              </div>

              <div className="rows">
                <span>Email Id</span>
                <span>:</span>
                <span> narm123@gmail.com</span>
              </div>
            </div>

            <button className="download-btn">
              Download Invoice
            </button>

          </div>
        </div>
      )}
    </>
  );
};

export default PaymentStep;