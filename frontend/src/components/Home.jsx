import Navbar from "./Navbar";
import axios from 'axios'
import SubNav from "./SubNav";
import Container from "./Container";
import Buisness from "./Buisness";
import Question from "./Question";
import SeePrices from "./SeePrices";
import DoMore from "./DoMore";
import PromoDetails from "./PromoDetails";
import Footer from "./Footer";
import BusinessNav from "./Business/BusinessNav";
import BusinessHero from "./Business/BusinessHero";
import BusinessNetwork from "./Business/BusinessNetwork";
import BusinessLeverage from "./Business/BusinessLeverage";
import BusinessUpfront from "./Business/BusinessUpfront";
import BusinessFortune from "./Business/BusinessFortune";
import BusinessCutomer from "./Business/BusinessCutomer";
import BusinessCards from "./Business/BusinessCards";
import BusinessPromoInfo from "./Business/BusinessPromoInfo";
import BusinessFooter from "./Business/BusinessFooter";
import ReqRideHero from "./ReqRide/ReqRideHero";
import ReqRideMain from "./ReqRide/ReqRideMain";
import AirportMain from "./Airport/AirportMain";
import SeeMain from './SeeTerms/SeeMain'
import LearnMoreMain from "./LearnMore/LearnMoreMain";
import BusinessMain from './Business/BusinessMain'
import AboutMain from './AboutUs/AboutMain'
import LoginMain from "./Login_SignUp/LoginMain";
import OffMain from "./Offerings/OffMain";
import AlreadyMain from "./Login_SignUp/AlreadyMain";
import { useEffect, useState } from "react";


const Home = () => {

  const [User, setUser] = useState('')

  useEffect(() => {
  axios.get("/api/auth/me", {
    withCredentials: true
  })
  .then(res => {
    setUser(res.data.user)
  })
  .catch(() => {
    setUser(null)
  })
}, [])

  return (
    <div className="overflow-x-hidden">
      <Navbar user = {User} />
      <SubNav />
      <Container />
      <Buisness />
      <Question />
      <SeePrices />
      <DoMore />
      <PromoDetails />
      <Footer />
    </div>
  );
};

export default Home;
