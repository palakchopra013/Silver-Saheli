import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home(){
  const navigate = useNavigate();
  return (
    <section className="page-section">
      <h1>Welcome to Silver Saheli</h1>
      <p>Women-only trips for senior women (60+) — safe, companioned, medically supported and family-tracked.</p>

      <div style={{display:"flex", gap:12, marginTop:18}}>
        <button className="btn hero-primary" onClick={()=>navigate("/trips")}>Explore Trips</button>
        <button className="btn secondary" onClick={()=>alert("Community feature coming soon.")}>Join the Community</button>
      </div>

      <div style={{marginTop:28}}>
        <h2>Why Silver Saheli?</h2>
        <ul>
          <li>Women-only groups & verified female staff</li>
          <li>On-trip medical support & curated meals</li>
          <li>Real-time family tracking & SOS</li>
        </ul>
      </div>
    </section>
  );
}
