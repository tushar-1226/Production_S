import { Routes, Route } from "react-router-dom";
import "./App.css"; // Make sure this path points to main CSS file
import Home from "./components/Home";
import RideMap from "./components/Ride/RideMap";
import LearnMoreMain from "./components/LearnMore/LearnMoreMain";
import BusinessMain from "./components/Business/BusinessMain";
import ReqRideMain from "./components/ReqRide/ReqRideMain";
import AirportMain from "./components/Airport/AirportMain";
import SeeMain from "./components/SeeTerms/SeeMain";
import LoginMain from "./components/Login_SignUp/LoginMain";
import AlreadyMain from "./components/Login_SignUp/AlreadyMain";
import { useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";
import AboutMe from "./components/AboutMe";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const { loading } = useAuth();

  if (loading) return <div>Loading...</div>

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ride" element={<RideMap />} />
        <Route path="/business" element={<BusinessMain />} />
        <Route path="/exploreride" element={<ReqRideMain />} />
        <Route path="/airport" element={<AirportMain />} />
        <Route path="/learnmore" element={<LearnMoreMain />} />
        <Route path="/see" element={<SeeMain />} />
        <Route path='/signup' element={<LoginMain />} />
        <Route path='/login' element={<AlreadyMain />} />
        <Route path='/me' element={
          <ProtectedRoute>
            <AboutMe />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
};

export default App;
