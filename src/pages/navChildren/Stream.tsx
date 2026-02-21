import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import NavChildren from "../../components/navbar/NavChildren";
import StreamCarousel from "../../components/StreamCarousel";

const premierePosters = [
  {
    id: "interstellar",
    poster:
      "https://assets-in.bmscdn.com/discovery-catalog/events/et00481471-mytkwakdsj-portrait.jpg",
  },
  {
    id: "inception",
    poster:
      "https://assets-in.bmscdn.com/discovery-catalog/events/et00469548-fsyfnsrhhp-portrait.jpg",
  },
  {
    id: "dark-knight",
    poster:
      "https://assets-in.bmscdn.com/discovery-catalog/events/et00471506-sqdbkcmwpt-portrait.jpg",
  },
  {
    id: "joker",
    poster:
      "https://assets-in.bmscdn.com/discovery-catalog/events/et00439854-gxscnesqfe-portrait.jpg",
  },
  {
    id: "avengers",
    poster:
      "https://assets-in.bmscdn.com/discovery-catalog/events/et00483936-jqdtaxrhfp-portrait.jpg",
  },
];

const Stream = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Navbar />
      <NavChildren />

      {/* CAROUSEL */}
      <div className="px-4 sm:px-8 mt-6">
        <StreamCarousel />
      </div>

      {/* PREMIERE OF THE WEEK */}
      <div className="px-4 sm:px-20 mt-10">
        <h2 className="text-xl font-bold dark:text-white">
          Premiere of the Week
        </h2>

        <div className="flex gap-4 overflow-x-auto scrollbar-hide my-10">
          {premierePosters.map((movie) => (
            <img
              key={movie.id}
              src={movie.poster}
              alt="premiere"
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="w-40 sm:w-48 rounded-xl cursor-pointer"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stream;
