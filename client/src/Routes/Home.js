import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import HomeImg from '../Assests/img1.jpg';
import '../Styles/Home.css';
import Destination from '../Components/Destination';
import Trip from '../Components/Trip';
import Footer from '../Components/Footer';

function Home() {
  return (
    <div>
         <Navbar />
     <Hero 
     cName="hero"
     heroImg={HomeImg}/*test6 pic*/
     title="Explore the Beauty of Sri Lanka"
     text="Discover breathtaking landscapes, vibrant culture, and unforgettable adventures."
     buttonText="Travel Plan"
     url="/login"
     btnClass="show"
     />
      <Destination/>
      <Trip/>
      <Footer/>
    </div>
  )
}

export default Home
