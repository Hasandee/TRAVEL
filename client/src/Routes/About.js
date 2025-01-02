import React from 'react';
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import AboutImg from '../Assests/img2.jpg';


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
      
    </div>
  )
}

export default About
