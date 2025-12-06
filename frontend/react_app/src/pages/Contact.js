import React from "react";
import ContactForm from "../components/contactform";

export default function Contact(){
  function onSubmit(data){
    console.log("contact submit", data);
    // call API (POST /api/contact)
    alert("Thank you — our team will contact you shortly.");
  }
  return (
    <section className="page-section">
      <h2>Contact Support</h2>
      <p>We are here to help. Fill the form and we'll get back quickly.</p>
      <div style={{marginTop:18, maxWidth:700, marginLeft:"auto", marginRight:"auto"}}>
        <ContactForm onSubmit={onSubmit} />
      </div>
    </section>
  );
}
