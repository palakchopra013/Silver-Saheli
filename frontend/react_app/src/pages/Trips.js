import React from "react";
import TripCard from "../components/tripcard";

const trips = [
  { id:1, title:"Rishikesh One-Day Spiritual Tour", date:"25 Nov 2025", price:"₹1,499", includes:"Transport, Meals, Medical Support"},
  { id:2, title:"Golden Temple Pilgrimage", date:"5-7 Dec 2025", price:"₹6,999", includes:"Transport, Stay, Meals, Medical Support"},
  { id:3, title:"City Leisure Tour", date:"15 Dec 2025", price:"₹2,499", includes:"Sightseeing, Transport, Meals"}
];

export default function Trips(){
  function handleJoin(trip){ alert(`Thanks — we saved interest for: ${trip.title}`) }
  return (
    <section className="page-section">
      <h2>Our Upcoming Trips</h2>
      <div className="grid" style={{marginTop:18}}>
        {trips.map(t => <TripCard key={t.id} {...t} onJoin={()=>handleJoin(t)} />)}
      </div>
    </section>
  );
}
