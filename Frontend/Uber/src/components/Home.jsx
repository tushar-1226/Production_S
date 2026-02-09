import Navbar from "./Navbar";
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

const Home = () => {
  return (
    <div className="pt-16 overflow-x-hidden">
      <BusinessNav/>
      <BusinessHero/>
      {/* <Navbar />
      <SubNav />
      <Container />
      <Buisness />
      <Question />
      <SeePrices />
      <DoMore />
      <PromoDetails />
      <Footer /> */}
    </div>
  );
};

export default Home;
