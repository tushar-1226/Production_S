import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RideMap from "./components/Ride/RideMap";
import LearnMoreMain from "./components/LearnMore/LearnMoreMain";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ride" element={<RideMap />} />
      </Routes>
      
    </div>

  );
};

export default App;
