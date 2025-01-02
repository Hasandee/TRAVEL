
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from './Routes/Home';
import About from './Routes/About';
import Contact from './Routes/Contact';
import Destinations from './Routes/Destinations';
import Services from './Routes/Services';


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

       </Routes>
    </div>
    </Router>
  );
}

export default App;
