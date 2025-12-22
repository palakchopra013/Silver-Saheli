import React from "react";
import "../App.css";

export default function Contact() {
  return (
    <div className="page-section">
      <h1>We’re Here for You 💛</h1>
      <p>
        Whether you have a question, need help planning a trip, or just want to
        talk to someone — our team is always ready to listen.
      </p>

      <div className="grid" style={{ marginTop: "24px" }}>
        <div className="card">
          <h3>📞 Call Us</h3>
          <p>
            Speak directly to a Saheli support member.
            <br />
            <strong>+91 98765 43210</strong>
          </p>
          <p style={{ fontSize: "14px", color: "#666" }}>
            Available: 9 AM – 7 PM
          </p>
        </div>

        <div className="card">
          <h3>📧 Email Us</h3>
          <p>
            Prefer writing to us?
            <br />
            <strong>support@silversaheli.in</strong>
          </p>
          <p style={{ fontSize: "14px", color: "#666" }}>
            We usually reply within 24 hours
          </p>
        </div>

        <div className="card">
          <h3>🤝 Personal Assistance</h3>
          <p>
            Need help booking a trip or travelling alone for the first time?
          </p>
          <p style={{ fontSize: "14px", color: "#666" }}>
            We guide you step by step
          </p>
        </div>
      </div>

      <div className="card" style={{ marginTop: "32px" }}>
        <h2>Request a Call Back</h2>
        <p>
          Leave your details and one of our Sahelis will call you personally.
        </p>

        <form style={{ marginTop: "16px" }}>
          <input type="text" placeholder="Your Name" style={inputStyle} />
          <input type="tel" placeholder="Phone Number" style={inputStyle} />
          <textarea
            placeholder="How can we help you?"
            rows="4"
            style={inputStyle}
          />
          <button className="btn" style={{ marginTop: "12px" }}>
            Request Call Back
          </button>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px",
};
