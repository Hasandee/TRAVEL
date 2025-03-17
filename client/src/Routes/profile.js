import React, { useState } from 'react';

function UserProfile() {
  const [profileImage, setProfileImage] = useState(null);
  const [pastItineraries, setPastItineraries] = useState([
    "Trip to Paris",
    "Beach Vacation in Maldives",
    "Exploring Sri Lanka"
  ]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setProfileImage(null);
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="bg-white shadow-md p-6 rounded-lg w-96 flex flex-col items-center">
        {/* Profile Image Section */}
        <div className="relative w-32 h-32 mb-4">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
            />
          ) : (
            <div className="w-32 h-32 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          className="mb-2"
          onChange={handleImageUpload}
        />

        {profileImage && (
          <button
            className="mt-2 bg-red-500 text-white px-4 py-1 rounded"
            onClick={handleImageRemove}
          >
            Remove Photo
          </button>
        )}
      </div>

      {/* Past Itineraries Section */}
      <div className="mt-6 bg-white shadow-md p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Past Itineraries</h2>
        <ul className="list-disc list-inside text-gray-700">
          {pastItineraries.length > 0 ? (
            pastItineraries.map((trip, index) => (
              <li key={index} className="mb-2">{trip}</li>
            ))
          ) : (
            <p>No past itineraries found.</p>
          )}
        </ul>
      </div>
    </div>
  );
}

export default UserProfile;
