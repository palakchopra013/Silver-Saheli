import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <section className="home">

      {/* HERO SECTION */}
      <div className="home-hero">
        <h1>Travel Freely. Safely. Together.</h1>

        <p className="home-subtitle">
          <strong>Silver Saheli</strong> is India’s first women-only travel
          platform designed exclusively for senior women (60+).
          <br />
          Safe journeys, medical care, and complete family peace of mind.
        </p>

        <div className="home-actions">
          <button className="btn" onClick={() => navigate("/trips")}>
            View Upcoming Trips
          </button>

          <button
            className="btn secondary"
            onClick={() => navigate("/contact")}
          >
            Talk to Us
          </button>
        </div>
      </div>

      {/* FEATURES */}
      <div className="home-features">
        <div className="card">
          <h3>Women-Only Travel Groups</h3>
          <p>
            Travel only with women of your age group, accompanied by trained
            female coordinators throughout the journey.
          </p>
        </div>

        <div className="card">
          <h3>Medical & Safety Support</h3>
          <p>
            Health-friendly itineraries, emergency response plans, and
            on-trip assistance for complete peace of mind.
          </p>
        </div>

        <div className="card">
          <h3>Family Connectivity</h3>
          <p>
            Families stay informed with live updates, location sharing,
            and emergency contact access.
          </p>
        </div>
      </div>

      {/* TRUST SECTION */}
      <div className="home-trust">
        <h2>Why Families Trust Silver Saheli</h2>

        <ul>
          <li>✔ Slow-paced and comfortable itineraries</li>
          <li>✔ Verified hotels, transport & hygienic food</li>
          <li>✔ 24/7 support team & emergency assistance</li>
          <li>✔ Respectful, warm and safe environment</li>
        </ul>
      </div>

      {/* EMOTIONAL CTA */}
      <div className="home-cta">
        <h2>For Every Mother Who Dreamed of Travelling Again</h2>
        <p>
          Silver Saheli exists to give senior women the confidence to
          explore the world again — with dignity, safety and companionship.
        </p>

        <button className="btn" onClick={() => navigate("/family")}>
          See How Families Stay Connected
        </button>
      </div>

    </section>
  );
}
