 import React from 'react';
import { FaCalendarAlt, FaClock, FaUserShield, FaClinicMedical } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const handleLoginClick = (type) => {
    alert(`${type} login coming soon!`);
  };

  return (
    <div className="healthcare-container">
      {/* Navigation */}
      <nav className="healthcare-nav">
        <div className="nav-brand">
          <FaClinicMedical className="nav-logo" />
          <span>CampusMate</span>
        </div>
        <div className="nav-links">
          <a href="#Login">Login</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* Hero with Background Image */}
      <section className="healthcare-hero">
        <div className="hero-content">
          <h1>Student Health Services</h1>
          <p className="hero-subtitle">24/7 Appointment Scheduling</p>
          
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <h2>Why Choose CampusMate?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <FaCalendarAlt className="feature-icon" />
            <h3>Easy Scheduling</h3>
            <p>Book in under 60 seconds</p>
          </div>
          <div className="feature-card">
            <FaClock className="feature-icon" />
            <h3>Quick Response</h3>
            <p>2-hour confirmation time</p>
          </div>
          <div className="feature-card">
            <FaUserShield className="feature-icon" />
            <h3>Secure Portal</h3>
            <p>HIPAA-compliant</p>
          </div>
        </div>
      </section>

      

      {/* Footer */}
      <footer className="healthcare-footer">
        <div className="footer-content">
          <p>© 2025 CampusMate Health Services</p>
          <div className="footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;