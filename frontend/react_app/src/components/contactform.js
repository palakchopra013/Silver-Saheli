import React, { useState } from "react";

export default function ContactForm({onSubmit}){
  const [name,setName] = useState("");
  const [phone,setPhone] = useState("");
  const [message,setMessage] = useState("");

  function submit(e){
    e.preventDefault();
    onSubmit?.({name,phone,message});
    setName(""); setPhone(""); setMessage("");
    alert("Message sent — we'll reach out soon.");
  }

  return (
    <form onSubmit={submit}>
      <label>Name</label>
      <input value={name} onChange={e=>setName(e.target.value)} required />
      <label>Phone</label>
      <input value={phone} onChange={e=>setPhone(e.target.value)} required />
      <label>Message</label>
      <textarea value={message} onChange={e=>setMessage(e.target.value)} rows="5" required />
      <button className="btn" type="submit">Send Message</button>
    </form>
  );
}
