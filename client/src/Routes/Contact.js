import React from 'react';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import ContactImg from '../Assests/test11.jpg';
import Footer from '../Components/Footer';
import '../Styles/Contact.css'

function Contact() {
  return (
    <div>
      <Navbar />
      <Hero
        cName="hero-mid"
        heroImg={ContactImg}
        title="Contact"
        btnClass="hide"
      />
      <section className="contact-section">
        <div className="contact-container">
          <div className="contact-info">
            <h2>Contact Us</h2>
            <p>We’d love to hear from you! Reach out for any inquiries or assistance.</p>
            <ul>
              <li>
                <strong>Email:</strong> explorelanka@gmail.com
              </li>
              <li>
                <strong>Phone:</strong> +94 77 123 4567
              </li>
              <li>
                <strong>Address:</strong> 123 Explore Lanka Road, Colombo, Sri Lanka
              </li>
            </ul>
          </div>
          <div className="contact-form">
            <h2>Send Us a Message</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Your Name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Your Email" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" rows="5" placeholder="Your Message"></textarea>
              </div>
              <button type="submit" className="contact-button">Submit</button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Contact;
