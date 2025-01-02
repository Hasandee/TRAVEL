import React from 'react';
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import AboutImg from '../Assests/img4.jpg';

function Contact() {
  return (
    <div>
        <Navbar />
     <Hero 
     cName="hero-mid"
     heroImg={AboutImg}
     title="Contact"
     btnClass="hide"
     />
    </div>
  )
}

export default Contact
