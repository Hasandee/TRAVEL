import React from 'react'
import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import HomeImg from '../Assests/img1.jpg';
import '../Styles/Home.css';
import Destination from '../Components/Destination';
import Trip from '../Components/Trip';

function Home() {
  return (
    <div>
         <Navbar />
     <Hero 
     cName="hero"
     heroImg={HomeImg}
     title="Explore the Beauty of Sri Lanka"
     text="Discover breathtaking landscapes, vibrant culture, and unforgettable adventures."
     buttonText="Travel Plan"
     url="/"
     btnClass="show"
     />
      <Destination/>
      <Trip/>
    </div>
  )
}

export default Home
