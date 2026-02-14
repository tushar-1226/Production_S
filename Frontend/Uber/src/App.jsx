import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RideMap from "./components/Ride/RideMap";
import LearnMoreMain from "./components/LearnMore/LearnMoreMain";
import BusinessMain from "./components/Business/BusinessMain";
import ReqRideMain from "./components/ReqRide/ReqRideMain";
import AirportMain from "./components/Airport/AirportMain";
import SeeMain from "./components/SeeTerms/SeeMain";

const App = () => {
  console.log("App");
  console.log("App");
  console.log("App");
  console.log("App");

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ride" element={<RideMap />} />
        <Route path="/business" element={<BusinessMain/>}/>
        <Route path="/exploreride" element={<ReqRideMain/>}/>
        <Route path="/airport" element={<AirportMain/>}/>
        <Route path="/learnmore" element={<LearnMoreMain/>}/>
        <Route path="/see" element={<SeeMain/>}/>
      </Routes>
    </div>

  );
};

export default App;
