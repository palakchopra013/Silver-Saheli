import React from "react";
import EmergencyCard from "../components/emergencycard";

export default function Emergency(){
  function doSOS(){
    alert("SOS sent! Support & family notified with location (demo).");
    // call API or Location service here
  }
  return (
    <section className="page-section">
      <h2>Emergency & SOS</h2>
      <p>If in danger, use SOS — the system alerts support & family instantly.</p>
      <div style={{marginTop:20}}>
        <EmergencyCard onSOS={doSOS} />
      </div>
    </section>
  );
}
