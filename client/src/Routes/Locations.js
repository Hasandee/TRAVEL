import React from 'react'
import '../Styles/Locations.css'
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import AboutImg from '../Assests/img14.jpg';
import Footer from '../Components/Footer';

function Locations() {
    return (
        <div>
          <Navbar />
          <Hero 
            cName="hero-mid"
            heroImg={AboutImg}
            title="Discover Sri Lanka’s Beauty and Culture"
            btnClass="hide" 
          />
          </div>
  )
}

export default Locations
