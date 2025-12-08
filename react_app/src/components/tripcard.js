import React from "react";

export default function TripCard({title, date, price, includes, onJoin}){
  return (
    <div className="card">
      <h3>{title}</h3>
      <p><strong>Date:</strong> {date}</p>
      <p><strong>Price:</strong> {price}</p>
      <p><strong>Includes:</strong> {includes}</p>
      <button className="btn" onClick={onJoin}>Join The Group</button>
    </div>
  );
}
