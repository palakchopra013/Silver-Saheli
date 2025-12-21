import React from "react";

export default function Trips() {
  return (
    <section className="page-section">
      <h1>Our Travel Programs ✈️</h1>
      <p>
        Each journey is thoughtfully designed keeping comfort, safety,
        and enjoyment of senior women in mind.
      </p>

      <div className="grid" style={{ marginTop: 32 }}>
        <div className="card">
          <h3>Rishikesh Wellness Retreat</h3>
          <p><strong>Duration:</strong> 7 Days</p>
          <p><strong>Highlights:</strong> Yoga, meditation, Ganga Aarti</p>
          <p><strong>Support:</strong> Medical staff + female coordinator</p>
          <button className="btn">View Itinerary</button>
        </div>

        <div className="card">
          <h3>Jaipur Heritage Experience</h3>
          <p><strong>Duration:</strong> 5 Days</p>
          <p><strong>Highlights:</strong> Palaces, guided city tours</p>
          <p><strong>Support:</strong> Wheelchair assistance available</p>
          <button className="btn">View Itinerary</button>
        </div>

        <div className="card">
          <h3>Kerala Backwaters & Ayurveda</h3>
          <p><strong>Duration:</strong> 6 Days</p>
          <p><strong>Highlights:</strong> Houseboat stay, Ayurvedic therapy</p>
          <p><strong>Support:</strong> Doctor-on-call</p>
          <button className="btn">View Itinerary</button>
        </div>
      </div>
    </section>
  );
}
