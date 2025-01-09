import React from 'react';
import '../Styles/Locations.css';
import Navbar from '../Components/Navbar';
import Hero from '../Components/Hero';
import Footer from '../Components/Footer';
import DestinationImg from '../Assests/img17.jpg';
import Img18 from '../Assests/img18.jpg';
import Img19 from '../Assests/img19.jpg';
import Img20 from '../Assests/img20.jpg';
import Img21 from '../Assests/img21.jpg';
import Img22 from '../Assests/img22.jpg';
import Img23 from '../Assests/img23.jpg';
import Img24 from '../Assests/img24.jpg';
import Img25 from '../Assests/img25.jpg';



function Locations() {
  const destinations = [
    {
        image: Img18, 
        title: 'Colombo',
        description: 'Colombo is the executive and judicial capital and largest city of Sri Lanka by population. According to the Brookings Institution, the Colombo metropolitan area has a population of 5.6 million, and 752,993 in the Municipality.',
      },
      {
        image: Img19,
        title: 'Kandy',
        description: 'Kandy is a large city in central Sri Lanka. It is set on a plateau surrounded by mountains, which are home to tea plantations and biodiverse rainforest. The city is heart is scenic Kandy Lake (Bogambara Lake), which is popular for strolling.',
      },
    {
      image: Img20,
      title: 'Nuwara Eliya',
      description: 'Nuwara Eliya is a city in the tea country hills of central Sri Lanka. The naturally landscaped Hakgala Botanical Gardens displays roses and tree ferns, and shelters monkeys and blue magpies.',
    },
    {
      image: Img21,
      title: 'Sigiriya',
      description: 'Sigiriya is one of Sri Lanka’s most popular tourist attractions – and with good reason. This ruined, fifth century city has some extraordinary features, including moat and wall fortifications, elaborately landscaped gardens, and a monastery.',
    },
    {
      image: Img22,
      title: 'Ella',
      description: 'Ella is a small village in the highlands of Sri Lanka which is filled with tea estates, mountains, waterfalls and of course with some good air to breathElla is a small town in the Badulla District of Uva Province, Sri Lanka governed by an Urban Council.',
    },
    {
      image: Img23,
      title: 'Galle',
      description: 'Galle is a city on the southwest coast of Sri Lanka. It’s known for Galle Fort, the fortified old city founded by Portuguese colonists in the 16th century. Stone sea walls, expanded by the Dutch, encircle car-free streets with architecture reflecting Portuguese, Dutch and British rule.',
    },
    {
        image: Img24,
        title: 'Jaffna',
        description: 'Jaffna is a city on the northern tip of Sri Lanka. Nallur Kandaswamy is a huge Hindu temple with golden arches and an ornate gopuram tower. By the coast, star-shaped Jaffna Fort was built by the Portuguese in the 17th century and later occupied by the Dutch and British.',
      },
      {
        image: Img25,
        title: 'Sinharaja',
        description: 'Sinharaja Forest Reserve is a forest reserve and a biodiversity hotspot in Sri Lanka. It is of international significance and has been designated a Biosphere Reserve and World Heritage Site by UNESCO. ',
      },
  ];

  return (
    <div>
      <Navbar />
      <Hero 
        cName="hero-mid"
        heroImg={DestinationImg}
        title="Destinations Sri Lanka"
        btnClass="hide" 
      />
      <section className="destinations-section">
        <h2>Top Destinations</h2>
        <p>Discover the most enchanting places in Sri Lanka.</p>
        <div className="destinations-grid">
          {destinations.map((destination, index) => (
            <div className="destination-card" key={index}>
              <img src={destination.image} alt={destination.title} />
              <h3>{destination.title}</h3>
              <p>{destination.description}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default Locations;
