import React from "react";

export default function EmergencyCard({onSOS}){
  return (
    <div className="card">
      <h3>Immediate SOS</h3>
      <p>Press SOS to alert support & family with live location.</p>
      <button className="btn emergency" onClick={onSOS} style={{background:"#E53935"}}>🔴 SOS — I Need Help</button>
    </div>
  );
}
