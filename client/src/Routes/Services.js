import React from 'react';
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import AboutImg from '../Assests/test2.jpg';

function Services() {
  return (
    <div>
        <Navbar />
     <Hero 
     cName="hero-mid"
     heroImg={AboutImg}
     title="Service"
     btnClass="hide"
     />
    </div>
  )
}

export default Services
