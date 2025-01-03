import '../Styles/Trip.css';
import TripData from "./TripData"
import Trip1 from "../Assests/img11.jpg"
import Trip2 from "../Assests/img12.jpg"
import Trip3 from "../Assests/img13.jpg"
import React from 'react'


function Trip() {
  return (
    <div className='trip'>
        <h1>Recent Trips</h1>
        <p>You can discover unique destinations using Google Maps.</p>

      <div className='tripcard'>
        <TripData
        image={Trip1}
        heading = "Trip to Nuwaraeliya"
        text ="Experience the charm of Nuwara Eliya, fondly known as 'Little England,' with its cool climate, rolling tea plantations, and colonial-era architecture. Wander through lush green hills, visit cascading waterfalls, and enjoy the serene beauty of Gregory Lake. A trip to Nuwara Eliya promises a perfect blend of natural splendor and timeless elegance"
        />

<TripData
        image={Trip2}
        heading = "Nature and Wild Tours"
        text ="Immerse yourself in the untamed beauty of Sri Lanka with our Nature and Wild Tours. Explore lush rainforests, encounter majestic wildlife in their natural habitats, and witness breathtaking landscapes that showcase the island's rich biodiversity. From thrilling safaris in national parks to serene nature trails, each journey offers unforgettable encounters with Sri Lanka's vibrant flora and fauna."
        />

<TripData
        image={Trip3}
        heading = "Trip to Galle"
        text ="Discover the coastal allure of Galle, a city rich in history and charm. Wander through the iconic Galle Fort, a UNESCO World Heritage Site, with its cobblestone streets, colonial architecture, and vibrant boutiques. Relax by golden beaches, explore quaint cafes, and soak in the stunning ocean views that make Galle a must-visit destination."
        />
        </div>
    </div>
  )
}

export default Trip
