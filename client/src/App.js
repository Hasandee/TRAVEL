
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
import TravelForm from './Routes/TravelForm';
import ItineraryPage from './Components/ItineraryPage';
import Results from './Routes/Results';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import Profile from './Routes/profile';
import SavedItinerary from './Routes/SavedItinerary';
import AdminItineraries from './Routes/AdminItineraries';
import Query from './Routes/Query';
import AdminQuery from './Routes/AdminQuery';
import Feedback from './Routes/Feedback';
import AdminFeedback from './Routes/AdminFeedback';


function App() {
  const { isAuthenticated,userData } = useAuth();
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
        <Route path="/register" element={ !isAuthenticated ? <Register /> : 
        userData.role === "admin"?<Navigate to="/adminprofile" />: <Navigate to="/userprofile" /> } />
        <Route path="/login" element={ !isAuthenticated ? <Login /> :
        userData.role === "admin"?<Navigate to="/adminprofile" />: <Navigate to="/userprofile" /> } />
        <Route path="/userprofile" element={ isAuthenticated ? <UserProfile /> : <Login />} />
        <Route path="/adminprofile" element={ isAuthenticated ? <AdminProfile /> : <Login />} />
        <Route path="/travelform" element={<TravelForm />} />
        <Route path="/itinerarypage" element={<ItineraryPage />} />
        <Route path="/results" element={<Results />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/saveditinerary" element={<SavedItinerary />} />
        <Route path="/adminitineraries" element={<AdminItineraries />} />
        <Route path="/query" element={<Query />} />
        <Route path="/adminquery" element={<AdminQuery />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/adminfeedback" element={<AdminFeedback />} />
        

       </Routes>
    </div>
    </Router>
  );
}

export default App;
