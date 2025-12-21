import React from "react";

export default function Emergency() {
  return (
    <section className="page-section">
      <h1>Emergency Support 🚨</h1>
      <p>
        Immediate assistance is available at all times during every Silver Saheli trip.
      </p>

      <div className="grid" style={{ marginTop: 32 }}>
        <div className="card">
          <h3>🆘 One-Tap SOS</h3>
          <p>
            Instantly alerts trip staff, medical team, and family members.
          </p>
          <button className="btn danger">Activate SOS</button>
        </div>

        <div className="card">
          <h3>🏥 Medical Assistance</h3>
          <p>
            Partner hospitals, ambulance support, and emergency medication.
          </p>
        </div>

        <div className="card">
          <h3>👩‍⚕️ On-Trip Care</h3>
          <p>
            Female caretakers and coordinators accompany every group.
          </p>
        </div>
      </div>
    </section>
  );
}
