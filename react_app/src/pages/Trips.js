import React from "react";
import "./Trips.css";

function Trips() {
  const trips = [
    {
      title: "🛕 One-Day Temple Visit",
      duration: "1 Day",
      level: "Very Easy",
      description:
        "A peaceful one-day spiritual outing designed especially for senior women.",
      highlights: [
        "Visit to nearby famous temple",
        "Slow-paced darshan",
        "Comfortable transport",
        "Assistance throughout the day",
        "Vegetarian lunch included",
      ],
      note: "Ideal for senior women seeking calm and devotion",
    },
    {
      title: "🌿 Vrindavan – Mathura Spiritual Tour",
      duration: "3 Days / 2 Nights",
      level: "Easy",
      description:
        "A gentle spiritual journey covering Krishna temples with proper care and rest.",
      highlights: [
        "Guided temple visits",
        "Senior-friendly hotel stay",
        "Group travel with women companions",
        "Morning & evening aarti",
      ],
      note: "Perfect for women aged 55+",
    },
    {
      title: "🌸 Rishikesh Relaxation Retreat",
      duration: "4 Days / 3 Nights",
      level: "Easy",
      description:
        "Relax, breathe, and rejuvenate by the Ganges with yoga and light activities.",
      highlights: [
        "Light yoga & meditation",
        "Ganga aarti experience",
        "Calm riverside stay",
        "Healthy vegetarian meals",
      ],
      note: "Great for mental peace & relaxation",
    },
    {
      title: "🚆 Shirdi Sai Baba Darshan",
      duration: "2 Days / 1 Night",
      level: "Easy",
      description:
        "A well-planned darshan trip with special focus on comfort and safety.",
      highlights: [
        "Priority darshan assistance",
        "Comfortable train/bus travel",
        "Dedicated trip coordinator",
        "Medical help on call",
      ],
      note: "Trusted spiritual journey with full support",
    },
    {
      title: "🏞️ Short Hill Getaway – Mussoorie",
      duration: "3 Days / 2 Nights",
      level: "Moderate",
      description:
        "A refreshing hill break with scenic views and relaxed sightseeing.",
      highlights: [
        "Scenic viewpoints",
        "Leisure walks",
        "Warm & cozy stay",
        "No hectic schedule",
      ],
      note: "For women who enjoy nature at a relaxed pace",
    },
  ];

  return (
    <div className="page-section trips-page"> 
      <h1 className="trips-title">Our Special Trips</h1>
      <p className="trips-subtitle">
        Safe, comfortable, and joyful journeys designed specially for senior
        women 💖
      </p>

      <div className="trips-grid">
        {trips.map((trip, index) => (
          <div className="trip-card" key={index}>
            <h2>{trip.title}</h2>

            <p className="trip-meta">
              {trip.duration} • {trip.level}
            </p>

            <p className="trip-description">{trip.description}</p>

            <ul className="trip-highlights">
              {trip.highlights.map((item, i) => (
                <li key={i}>✔ {item}</li>
              ))}
            </ul>

            <p className="trip-note">{trip.note}</p>

            <button className="trip-button">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trips;
