import React from "react";

export default function Contact() {
  return (
    <section className="page-section">
      <h1>Contact Silver Saheli 💌</h1>
      <p>
        Have questions? Planning a trip for your loved one?
        We’re here to help.
      </p>

      <div className="card" style={{ maxWidth: 520, marginTop: 32 }}>
        <p><strong>Email:</strong> support@silversaheli.com</p>
        <p><strong>Phone:</strong> +91 9XXXXXXXXX</p>
        <p><strong>Support Hours:</strong> 24×7</p>

        <button className="btn" style={{ marginTop: 16 }}>
          Send Us a Message
        </button>
      </div>
    </section>
  );
}
