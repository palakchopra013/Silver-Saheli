import React from "react";
import FamilyMemberCard from "../components/FamilyMemberCard";

const members = [
  {id:1, name:"Meena Devi", relation:"Grandmother", phone:"+91 98xxxxxxx"},
  {id:2, name:"Sunita Sharma", relation:"Mother", phone:"+91 97xxxxxxx"}
];

export default function Family(){
  return (
    <section className="page-section">
      <h2>Family Tracking & Updates</h2>
      <p>Share live trip updates with trusted family members.</p>
      <div className="grid" style={{marginTop:18}}>
        {members.map(m=> <FamilyMemberCard key={m.id} {...m} />)}
      </div>
    </section>
  );
}
