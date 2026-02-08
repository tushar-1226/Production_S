import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import RideMap from "./components/Ride/RideMap";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ride" element={<RideMap />} />
      
    </Routes>
  );
};

export default App;
