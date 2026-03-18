import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import RidersRideDashboard from "./RidersRideDashboard";

const RideTrackingPage = () => {
  const { rideId } = useParams();
  const navigate = useNavigate();
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!rideId) return;

    const fetchRide = async () => {
      try {
        // Poll the rider's accepted rides to find this specific ride
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/ride/accepted-rides-rider`,
          { withCredentials: true }
        );
        const found = res.data.ride?.find((r) => r._id === rideId);
        if (found) {
          setRide(found);
        } else {
          setError("Ride not found. It may have been cancelled.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load ride details.");
      } finally {
        setLoading(false);
      }
    };

    fetchRide();

    // Poll every 5 seconds to get live status updates (driver accepted, ride started etc.)
    const interval = setInterval(fetchRide, 5000);
    return () => clearInterval(interval);
  }, [rideId]);

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-600 font-medium">Loading your ride...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white z-50 px-6">
        <div className="flex flex-col items-center gap-4 text-center max-w-xs">
          <div className="text-4xl">🚫</div>
          <p className="text-gray-800 font-semibold text-lg">{error}</p>
          <button
            onClick={() => navigate("/ride")}
            className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all"
          >
            Back to Ride
          </button>
        </div>
      </div>
    );
  }

  return <RidersRideDashboard ride={ride} setRide={setRide} />;
};

export default RideTrackingPage;
