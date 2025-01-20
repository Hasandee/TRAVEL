
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; 
import Home from './Routes/Home';
import About from './Routes/About';
import Contact from './Routes/Contact';
import Destinations from './Routes/Destinations';
import Locations from './Routes/Locations';
import Services from './Routes/Services';
import Footer from './Components/Footer';
import Register from './Auth/Register';
import Login from './Auth/Login';
import UserProfile from './Routes/UserProfile';
import { useAuth } from './Contexts/AuthContext';
import AdminProfile from './Routes/AdminProfile';
import ItineraryPlanner from './Routes/ItineraryPlanner';


function App() {
  const { isAuthenticated } = useAuth();
  return (
    <Router>
    <div className="App">
   
      <Routes>
  
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/destinations" element={<Destinations />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/register" element={ !isAuthenticated ? <Register /> : <Navigate to="/userprofile" /> } />
        <Route path="/login" element={ !isAuthenticated ? <Login /> : <Navigate to="/userprofile" />} />
        <Route path="/userprofile" element={ isAuthenticated ? <UserProfile /> : <Login />} />
        <Route path="/adminprofile" element={ isAuthenticated ? <AdminProfile /> : <Login />} />
        <Route path="/itineraryplanner" element={<ItineraryPlanner />} />

       </Routes>
    </div>
    </Router>
  );
}

export default App;
