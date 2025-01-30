import React, { useState } from 'react';
import '../Styles/ItineraryPlanner.css';

const TouristInformationForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    contact: '',
    interests: [],
    budget: '',
    travelType: '',
    accommodation: '',
    travelDates: {
      startDate: '',
      endDate: ''
    },
    transport: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, [name]: [...formData[name], value] });
    } else {
      setFormData({ ...formData, [name]: formData[name].filter((item) => item !== value) });
    }
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      travelDates: { ...formData.travelDates, [name]: value }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Data Submitted:', formData);
  };

  return (
    <form className="itinerary-form" onSubmit={handleSubmit}>
      <h1 className="itinerary-heading">Tourist Information Form</h1>

      <h2 className="itinerary-subheading">1. Personal Information</h2>
      <label className="itinerary-label">
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="itinerary-input"
        />
      </label>
      <label className="itinerary-label">
        Age:
        <input
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          className="itinerary-input"
        />
      </label>
      <label className="itinerary-label">
        Contact No.:
        <input
          type="text"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          className="itinerary-input"
        />
      </label>

      <h2 className="itinerary-subheading">2. Travel Preferences</h2>
      <label className="itinerary-label">
        Interests:
        <div className="itinerary-checkbox-group">
          {['Culture', 'Adventure', 'Beach', 'Wildlife', 'Relaxation', 'Culinary'].map((interest) => (
            <label key={interest} className="itinerary-checkbox-label">
              <input
                type="checkbox"
                name="interests"
                value={interest}
                onChange={handleCheckboxChange}
                className="itinerary-checkbox"
              />
              {interest}
            </label>
          ))}
        </div>
      </label>
      <label className="itinerary-label">
        Budget Range:
        <div className="itinerary-radio-group">
          {['Low', 'Medium', 'High'].map((budget) => (
            <label key={budget} className="itinerary-radio-label">
              <input
                type="radio"
                name="budget"
                value={budget}
                onChange={handleChange}
                className="itinerary-radio"
              />
              {budget}
            </label>
          ))}
        </div>
      </label>
      <label className="itinerary-label">
        Travel Type:
        <div className="itinerary-radio-group">
          {['Solo', 'Family', 'Group'].map((type) => (
            <label key={type} className="itinerary-radio-label">
              <input
                type="radio"
                name="travelType"
                value={type}
                onChange={handleChange}
                className="itinerary-radio"
              />
              {type}
            </label>
          ))}
        </div>
      </label>
      <label className="itinerary-label">
        Accommodation Preference:
        <div className="itinerary-radio-group">
          {['Budget', 'Luxury', 'Eco-friendly'].map((accommodation) => (
            <label key={accommodation} className="itinerary-radio-label">
              <input
                type="radio"
                name="accommodation"
                value={accommodation}
                onChange={handleChange}
                className="itinerary-radio"
              />
              {accommodation}
            </label>
          ))}
        </div>
      </label>

      <h2 className="itinerary-subheading">3. Trip Details</h2>
      <label className="itinerary-label">
        Planned Travel Dates:
        <input
          type="date"
          name="startDate"
          value={formData.travelDates.startDate}
          onChange={handleDateChange}
          className="itinerary-date"
        />
        <input
          type="date"
          name="endDate"
          value={formData.travelDates.endDate}
          onChange={handleDateChange}
          className="itinerary-date"
        />
      </label>

      <h2 className="itinerary-subheading">4. Additional Needs</h2>
      <label className="itinerary-label">
        Transport Preferences:
        <div className="itinerary-checkbox-group">
          {['Train', 'Bus', 'Rental Car'].map((transport) => (
            <label key={transport} className="itinerary-checkbox-label">
              <input
                type="checkbox"
                name="transport"
                value={transport}
                onChange={handleCheckboxChange}
                className="itinerary-checkbox"
              />
              {transport}
            </label>
          ))}
        </div>
      </label>

      <button className="itinerary-submit-btn" type="submit">
        Submit
      </button>
    </form>
  );
};

export default TouristInformationForm;
