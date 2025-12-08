import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar(){
  const navigate = useNavigate();

  function handleHome(){ navigate("/"); }

  function toggleTheme(){
    document.body.classList.toggle("dark-theme");
    const mode = document.body.classList.contains("dark-theme") ? "dark" : "light";
    localStorage.setItem("ss_theme", mode);
  }

  React.useEffect(()=>{
    const saved = localStorage.getItem("ss_theme");
    if(saved === "dark") document.body.classList.add("dark-theme");
  }, []);

  return (
    <header className="navbar">
      <div className="nav-left">
        <div style={{cursor:"pointer"}} onClick={handleHome} className="logo">Silver Saheli</div>
        <div style={{color:"#777"}} className="tagline">Safe travel for senior women</div>
      </div>

      <nav className="nav-links" aria-label="Main navigation">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/trips">Trips</NavLink>
        <NavLink to="/family">Family</NavLink>
        <NavLink to="/emergency">Emergency</NavLink>
        <NavLink to="/contact">Contact</NavLink>

        <button id="themeToggle" className="btn secondary" style={{marginLeft:12}} onClick={toggleTheme}>
          🌙 Toggle Theme
        </button>
      </nav>
    </header>
  );
}
