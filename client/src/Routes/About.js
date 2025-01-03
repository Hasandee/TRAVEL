import React from 'react';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import AboutImg from '../Assests/img14.jpg';
import Footer from '../Components/Footer';
import '../Styles/About.css'; // Import the CSS styles for About

function About() {
  return (
    <div>
      <Navbar />
      <Hero 
        cName="hero-mid"
        heroImg={AboutImg}
        title="Discover Sri Lanka’s Beauty and Culture"
        btnClass="hide"
      />
      <div className="about-page">
        <h1>About ExploreLanka</h1>
        <p>
          ExploreLanka is dedicated to showcasing the unparalleled beauty, culture, and adventure that Sri Lanka has to offer. Whether you're looking to explore historical landmarks, immerse yourself in nature, or relax on pristine beaches, we provide personalized travel experiences tailored to your interests.
        </p>
        <img src="../Assests/img15.jpg" alt="Cultural dance in Sri Lanka" />
        <div className="about-sections">
          <div className="section">
            <h2>Our Mission</h2>
            <p>
              To inspire and connect travelers with the vibrant heritage and natural wonders of Sri Lanka, ensuring unforgettable journeys filled with cherished memories.
            </p>
          </div>
          <div className="section">
            <h2>Why Choose Us?</h2>
            <p>
              With expert guides, curated itineraries, and a passion for Sri Lanka, we ensure every trip is an exceptional experience that exceeds expectations.
            </p>
          </div>
          <div className="section">
            <h2>Our Vision</h2>
            <p>
              To be the leading travel companion for those seeking to discover the true essence of Sri Lanka, promoting sustainable tourism and cultural preservation.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
