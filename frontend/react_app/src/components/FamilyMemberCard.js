import React from "react";

export default function FamilyMemberCard({name, relation, phone}){
  return (
    <div className="card">
      <h3>{name}</h3>
      <p>{relation}</p>
      <p>{phone}</p>
      <button className="btn">Call</button>
    </div>
  );
}
