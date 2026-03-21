
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./PaymentStep.css";
import { useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js/dist/html2pdf.bundle";

const BASE_URL = "https://vts-backend-wky4.onrender.com";

const PaymentStep = ({ formData,onClose }) => {
  const [methods, setMethods] = useState([]);
  const [selected, setSelected] = useState("");
  const [upi, setUpi] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const navigate = useNavigate();

  // Fetch payment methods
  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/payment-methods/`)
      .then((res) => setMethods(res.data))
      .catch(() => {});
  }, []);
useEffect(() => {
  return () => {
    setShowSuccess(false);
  };
}, []);
  // Group methods
  const grouped = methods.reduce((acc, item) => {
    acc[item.method_type] = acc[item.method_type] || [];
    acc[item.method_type].push(item);
    return acc;
  }, {});

  // ✅ DOWNLOAD INVOICE (WORKING FIX)
  const downloadInvoice = () => {
    const invoiceHtml = `
      <div style="width:800px; padding:20px; font-family:Arial; background:#fff; color:#000;">
        
        <h2 style="text-align:center;">INVOICE</h2>
        <hr/>

        <p><strong>Company:</strong> VTS Academy</p>
        <p><strong>Transaction ID:</strong> GDHS200001</p>
        <p><strong>Date:</strong> 02/04/2026</p>

        <hr/>

        <p><strong>Name:</strong> ${formData?.firstName || "-"}</p>
        <p><strong>Email:</strong> ${formData?.email || "-"}</p>
        <p><strong>Payment Method:</strong> ${selected}</p>
        <p><strong>UPI:</strong> ${upi || "-"}</p>

        <hr/>

        <p>Course Amount: ₹30,000</p>
        <p>GST: ₹1,000</p>
        <h3>Total Paid: ₹31,000</h3>

        <hr/>

        <p style="text-align:center;">Thank you for your payment!</p>

      </div>
    `;

    const opt = {
      margin: 0.3,
      filename: "Invoice.pdf",
      html2canvas: {
        scale: 3,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
    };

    html2pdf().from(invoiceHtml).set(opt).save();
  };

  const handlePay = () => {
    if (selected === "upi" && !upi.trim()) {
      alert("Please enter UPI ID");
      return;
    }

    setShowSuccess(true);
  };

  return (
    <>
      <div className="payment-wrapper">
        <h4 className="payment-title">Choose Your Payment Option</h4>

        <div className="payment-layout">

          {/* LEFT */}
          <div className="amount-box">
            <div>
              <span>Course Amount</span>
              <span>₹30,000</span>
            </div>
            <div>
              <span>GST</span>
              <span>₹1,000</span>
            </div>
            <hr />
            <div className="total">
              <span>Total</span>
              <span>₹31,000</span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="payment-options">

            {["upi", "netbanking", "card"].map((type) => (
              <div
                key={type}
                className={`payment-card ${selected === type ? "active" : ""}`}
                onClick={() => setSelected(type)}
              >
                <div className="radio-outer">
                  {selected === type && <div className="radio-inner" />}
                </div>

                <div className="icons">
                  {grouped[type]?.map((icon) => (
                    <img
                      key={icon.id}
                      src={`${BASE_URL}${icon.icon}`}
                      alt={icon.title}
                    />
                  ))}
                </div>

                <span className="method-name">
                  {type === "upi"
                    ? "UPI"
                    : type === "netbanking"
                    ? "Net Banking"
                    : "Card"}
                </span>
              </div>
            ))}

            {selected === "upi" && (
              <div className="upi-row">
                <label>Enter UPI ID</label>
                <input
                  placeholder="example@ybl"
                  value={upi}
                  onChange={(e) => setUpi(e.target.value)}
                />
              </div>
            )}

            {selected && (
              <button className="pay-btn" onClick={handlePay}>
                Pay Now
              </button>
            )}

          </div>
        </div>
      </div>

      {/* SUCCESS POPUP (UNCHANGED) */}
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
                <span>02/04/2026</span>
              </div>

              <div className="rows">
                <span>Payment Method</span>
                <span>:</span>
                <span>{selected === "upi" ? "Google Pay / UPI" : selected}</span>
              </div>

              <div className="rows">
                <span>Amount Paid</span>
                <span>:</span>
                <span>₹31,000</span>
              </div>

              <div className="rows">
                <span>Email Id</span>
                <span>:</span>
                <span>{formData?.email || "-"}</span>
              </div>
            </div>

           <div className="btn-group">
  <button className="download-btn" onClick={downloadInvoice}>
    Download Invoice
  </button>

  <button
    className="home-btn"
   onClick={() => {
  setShowSuccess(false);   // ✅ reset popup
  setSelected("");         // optional reset
  setUpi("");
   onClose();               // optional reset
  navigate("/");
}}
  >
    Back to Home
  </button>
</div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentStep;
