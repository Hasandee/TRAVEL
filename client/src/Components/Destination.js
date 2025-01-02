import Sigiriya1 from '../Assests/img5.jpg';
import Sigiriya2 from '../Assests/img6.jpg';
import Beach1 from '../Assests/img7.jpg';
import Beach2 from '../Assests/img8.jpg';
import '../Styles/Destination.css'
import DestinationData from './DestinationData';

const Destination = () => {
    return (
        <div className="destination">
            <h1>Popular Destination</h1>
            <p>Explore the hidden gems and iconic landmarks that make Sri Lanka a true paradise for travelers.</p>

            <DestinationData
            className="first-des"
                heading="Sigiriya - The Lion Rock Fortress"
                text="Sigiriya, often referred to as the Eighth Wonder of the World, is a UNESCO World Heritage Site and one of Sri Lanka's most iconic landmarks. This ancient rock fortress, standing 200 meters tall, emerges dramatically from the dense surrounding jungle, captivating visitors with its grandeur and mystery. Built in the 5th century by King Kashyapa, Sigiriya is an exceptional blend of history, architecture, and natural beauty.At the summit, the ruins of the royal palace offer breathtaking 360-degree views of the surrounding countryside, a reward for the climb that also unveils the fortress's strategic and aesthetic brilliance. Sigiriya is not just a historical monument; it is a testament to Sri Lanka's artistic and cultural heritage, leaving every visitor in awe of its timeless magnificence."
                img1={Sigiriya1}
                img2={Sigiriya2}

            />
            <DestinationData
            className="first-des-reverse"
                heading="Mirissa - Beach Bliss"
                text="Mirissa, a serene coastal paradise on Sri Lanka’s southern coast, is renowned for its golden sandy beaches, crystal-clear turquoise waters, and lively yet relaxed atmosphere. This charming town is a haven for beach lovers, offering the perfect blend of tranquility and excitement.Mirissa’s pristine shoreline invites visitors to unwind under swaying palm trees, while its vibrant nightlife, featuring beachfront bars and seafood feasts, adds a touch of energy as the sun sets. The town is also a world-famous hotspot for whale and dolphin watching, giving adventurers a chance to witness these majestic creatures up close. Surfing enthusiasts will find thrilling waves, while those seeking calm can enjoy kayaking or snorkeling in the warm, inviting waters.Whether you're chasing ocean adventures or simply looking to relax by the shore, Mirissa promises an unforgettable coastal escape."
               img1={Beach1}
                img2={Beach2}

            />

<DestinationData
            className="first-des"
                heading="Kandy - The Cultural Heart"
                text="Kandy, nestled in the heart of Sri Lanka's hill country, is a cultural and spiritual treasure that captivates visitors with its timeless charm. At its heart lies the revered Temple of the Tooth Relic, a UNESCO World Heritage Site and one of the most sacred places of worship for Buddhists worldwide. Pilgrims and visitors alike are drawn to its rich history, intricate architecture, and the spiritual ambiance that surrounds this iconic temple.The city itself is a picturesque haven, encircled by rolling green hills and centered around the tranquil Kandy Lake, which offers a peaceful spot for leisurely strolls. Beyond its spiritual significance, Kandy boasts colonial-era architecture, bustling markets, and vibrant cultural festivals, including the famous Esala Perahera, a grand procession celebrating the sacred tooth relic.With its harmonious blend of history, spirituality, and natural beauty, Kandy offers a unique experience that lingers in the hearts of all who visit."
                img1={Sigiriya1}
                img2={Sigiriya2}

            />




        </div>
    );
};
export default Destination