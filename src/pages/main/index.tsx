import HomeCarousel from "../../components/HomeCarousel";
import LiveEvents from "../../components/LiveEvents";
import Navbar from "../../components/navbar/Navbar";
import NavChildren from "../../components/navbar/NavChildren";
import RecommendedMovies from "../../components/RecommendedMovies";
import StreamImage from "../../components/StreamImage";

const Main = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <Navbar />
      <NavChildren />
      <HomeCarousel />
      <div className="px-4 sm:px-8 md:hidden">
        <img
          src="https://assets-in-gm.bmscdn.com/promotions/cms/creatives/1771566174974_21febhpslug656x130jurassicworldrebirthxponies.gif"
          alt="home jpg"
          className="rounded-2xl"
        />
      </div>
      <RecommendedMovies />
      <StreamImage />
      <LiveEvents />
    </div>
  );
};

export default Main;
