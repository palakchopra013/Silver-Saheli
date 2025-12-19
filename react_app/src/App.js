import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/footer';

import Home from './pages/Home';
import Trips from './pages/Trips';
import Family from './pages/Family';
import Emergency from './pages/Emergency';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trips" element={<Trips />} />
            <Route path="/family" element={<Family />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
