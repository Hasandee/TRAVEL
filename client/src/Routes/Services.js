import React from 'react';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import AboutImg from '../Assests/test8.jpg';
import icon1 from '../Assests/icon1.png';
import icon2 from '../Assests/icon2.png';
import icon3 from '../Assests/icon3.png';
import icon4 from '../Assests/icon4.png';
import icon5 from '../Assests/icon5.png';
import icon6 from '../Assests/icon6.png';
import '../Styles/Services.css';

function Services() {
  return (
    <div>
      <Navbar />
      <Hero 
        cName="hero-mid"
        heroImg={AboutImg}
        title="Our Services"
        btnClass="hide"
      />
      
      <section className="services-overview">
        <h1>Our Premium Services</h1>
        <p>
          At ExploreLanka, we offer a wide range of travel services to ensure
          your journey is seamless, memorable, and personalized.
        </p>
      </section>

      <section className="service-features">
        <div className="service-card">
          <img src={icon1} alt="Travel Planning Icon" />
          <h3>Customized Travel Planning</h3>
          <p>Crafted itineraries to match your preferences and pace.</p>
        </div>
        <div className="service-card">
        <img src={icon2} alt="Tour Guide Icon" />
          <h3>Expert Tour Guides</h3>
          <p>Local experts to enrich your travel experience.</p>
        </div>
        <div className="service-card">
          <img src={icon3} alt="Accommodation Icon" />
          <h3>Luxury Accommodation</h3>
          <p>Exclusive stays in Sri Lanka’s finest hotels and resorts.</p>
        </div>
      </section>

      <section className="why-choose-us">
        <h2>Why Choose ExploreLanka?</h2>
        <div className="benefits">
          <div className="benefit-item">
            <img src={icon4} alt="Trust" />
            <h4>Trusted Partner</h4>
            <p>Rated as the most reliable travel agency in Sri Lanka.</p>
          </div>
          <div className="benefit-item">
            <img src={icon5} alt="Affordable" />
            <h4>Affordable Packages</h4>
            <p>Great travel experiences at competitive prices.</p>
          </div>
          <div className="benefit-item">
            <img src={icon6} alt="Support" />
            <h4>24/7 Support</h4>
            <p>Always here to assist you during your travels.</p>
          </div>
        </div>
      </section>

      {/* <section className="contact-cta">
        <h2>Start Planning Your Trip Today!</h2>
        <p>Contact us to create unforgettable memories in Sri Lanka.</p>
        <button className="contact-button">Contact Us</button>
      </section> */}
    </div>
  );
}

export default Services;
