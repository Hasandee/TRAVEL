
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
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


function App() {
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
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userprofile" element={<UserProfile />} />

       </Routes>
    </div>
    </Router>
  );
}

export default App;
