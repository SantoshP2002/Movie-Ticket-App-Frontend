import { useParams } from "react-router-dom";
import Navbar from "./navbar/Navbar";
import NavChildren from "./navbar/NavChildren";
import { cast, crew, moviesData } from "../constants";

const MovieDetails = () => {
  const { id } = useParams();
  const movie = moviesData.find((m) => m.id === id);

  if (!movie) {
    return <div className="text-white p-6">Movie not found</div>;
  }

  return (
    <div className="dark:text-white">
      <Navbar />
      <NavChildren />
      {/*========================== MOVIE DETAILS ========================  */}
      <div className="relative h-112.5 w-full overflow-hidden">
        {/* BG IMAGE */}
        <img
          src={movie.bg}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-transparent" />

        {/* CONTENT */}
        <div className="relative z-10 flex h-full items-center gap-10 px-10">
          {/* POSTER */}
          <img src={movie.poster} className="h-80 w-56 rounded-xl shadow-xl" />

          {/* DETAILS */}
          <div className="max-w-xl">
            <img src={movie.premiere} className="h-6 mb-4" />

            <h1 className="text-4xl font-bold mb-2 dark:text-white text-white">
              {movie.title}
            </h1>

            <p className="text-sm text-gray-300 mb-3">
              {movie.duration} • {movie.genre} • {movie.language}
            </p>

            <p className="text-gray-200 leading-relaxed mb-6">{movie.desc}</p>

            <div className="flex gap-4">
              <button className="bg-red-500 px-6 py-3 rounded-lg">
                ▶ Book Tickets
              </button>
              <button className="bg-white/20 px-6 py-3 rounded-lg">
                + Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================================ DOWN SIDE DATA ================================= */}
      <div className="mt-8 px-4 sm:px-8">
        <h1 className="text-xl font-bold dark:text-white mb-3">
          About the Movie
        </h1>

        <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 max-w-3xl">
          In a future where Earth is slowly becoming uninhabitable, a team of
          astronauts travels through a newly discovered wormhole in search of a
          planet that can sustain human life, pushing the limits of science,
          love, and survival.
        </p>

        <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700" />
      </div>

      {/* ================================ CAST AND CREW =========================== */}
      <div className="px-4 sm:px-8 mt-10 space-y-8">
        {/* CAST */}
        <div>
          <h2 className="text-xl font-bold dark:text-white mb-4">Cast</h2>

          <div className="flex gap-5 overflow-x-auto scrollbar-hide">
            {cast.map((person) => (
              <div
                key={person.id}
                className="flex flex-col items-center shrink-0 w-24"
              >
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-24 h-24 rounded-full object-cover mb-2"
                />
                <p className="text-sm dark:text-white text-center">
                  {person.name}
                </p>
                <p className="text-xs text-gray-500 text-center">
                  {person.role}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CREW */}
        <div>
          <h2 className="text-xl font-bold dark:text-white mb-4">Crew</h2>

          <div className="flex gap-5 overflow-x-auto scrollbar-hide">
            {crew.map((person) => (
              <div
                key={person.id}
                className="flex flex-col items-center shrink-0 w-24"
              >
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-24 h-24 rounded-full object-cover mb-2"
                />
                <p className="text-sm dark:text-white text-center">
                  {person.name}
                </p>
                <p className="text-xs text-gray-500 text-center">
                  {person.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
