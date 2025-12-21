import React from "react";

export default function Family() {
  return (
    <section className="page-section">
      <h1>Family Assurance Dashboard 👨‍👩‍👧</h1>
      <p>
        We understand your concerns. Silver Saheli keeps families
        informed, connected, and reassured throughout the journey.
      </p>

      <div className="grid" style={{ marginTop: 32 }}>
        <div className="card">
          <h3>📍 Live Trip Tracking</h3>
          <p>
            View the current location and destination progress in real time.
          </p>
        </div>

        <div className="card">
          <h3>🩺 Daily Health Updates</h3>
          <p>
            Regular wellness checks shared with registered family members.
          </p>
        </div>

        <div className="card">
          <h3>🚨 Emergency Alerts</h3>
          <p>
            Instant notifications in case of medical or safety emergencies.
          </p>
        </div>

        <div className="card">
          <h3>📞 Direct Support</h3>
          <p>
            24×7 helpline access for families during trips.
          </p>
        </div>
      </div>
    </section>
  );
}
