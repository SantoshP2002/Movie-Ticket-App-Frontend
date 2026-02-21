import { useEffect, useState } from "react";
import MovieCarousel from "../../components/MovieCarousel";
import Navbar from "../../components/navbar/Navbar";
import NavChildren from "../../components/navbar/NavChildren";
import { movies } from "../../constants";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";

const Movies = () => {
  const navigate = useNavigate();
  const [locationName, setLocationName] = useState("India");

  useEffect(() => {
    const savedLocation = localStorage.getItem("selectedLocation");
    if (savedLocation) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocationName(savedLocation);
    }
  }, []);
  return (
    <div>
      <Navbar />
      <NavChildren />
      <MovieCarousel />

      {/* MAIN CONTENT */}
      <div className="px-4 sm:px-8 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-6">
          {/* LEFT: FILTER (30%) */}
          <div className="md:col-span-3 rounded-2xl p-5 bg-linear-to-b from-red-50 to-white dark:from-red-500 dark:to-gray-900 shadow-xl border border-red-200 dark:border-red-500 animate-[fadeInUp_0.6s_ease-out] h-130">
            <h2 className="text-xl font-bold mb-6 text-red-500 dark:text-red-200 flex items-center gap-2">
              🎛️ Filters
            </h2>

            <div className="space-y-6 text-sm text-gray-700 dark:text-gray-300">
              {/* LANGUAGE */}
              <div className="group animate-[fadeInUp_0.7s_ease-out]">
                <label className="block mb-1 font-semibold text-red-500 dark:text-red-300 group-hover:text-red-500 transition">
                  🌐 Language
                </label>

                <select className="w-full rounded-xl px-4 py-2.5 bg-white/80 dark:bg-black/60 backdrop-blur border border-red-300 dark:border-red-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400 hover:border-red-400 transition-all duration-500 ease-out">
                  <option>All Languages</option>
                  <option>Hindi</option>
                  <option>English</option>
                  <option>Tamil</option>
                  <option>Telugu</option>
                  <option>Kannada</option>
                  <option>Malayalam</option>
                  <option>Marathi</option>
                  <option>Bengali</option>
                </select>
              </div>

              {/* GENRE */}
              <div className="group animate-[fadeInUp_0.8s_ease-out]">
                <label className="block mb-1 font-semibold text-red-500 dark:text-red-300 group-hover:text-red-500 transition">
                  🎭 Genre
                </label>

                <select className="w-full rounded-xl px-4 py-2.5 bg-white/80 dark:bg-black/60 backdrop-blur border border-red-300 dark:border-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 hover:border-red-400 transition-all duration-500 ease-out">
                  <option>All Genres</option>
                  <option>Action</option>
                  <option>Drama</option>
                  <option>Comedy</option>
                  <option>Romance</option>
                  <option>Thriller</option>
                  <option>Horror</option>
                  <option>Sci-Fi</option>
                  <option>Fantasy</option>
                  <option>Animation</option>
                </select>
              </div>

              {/* FORMAT */}
              <div className="group animate-[fadeInUp_0.9s_ease-out]">
                <label className="block mb-1 font-semibold text-red-500 dark:text-red-300 group-hover:text-red-500 transition">
                  🎬 Format
                </label>

                <select className="w-full rounded-xl px-4 py-2.5 bg-white/80 dark:bg-black/60 backdrop-blur border border-red-300 dark:border-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 hover:border-red-400 transition-all duration-500 ease-out">
                  <option>All Formats</option>
                  <option>2D</option>
                  <option>3D</option>
                  <option>IMAX</option>
                  <option>4DX</option>
                  <option>MX4D</option>
                </select>
              </div>

              {/* RATING */}
              <div className="group animate-[fadeInUp_1s_ease-out]">
                <label className="block mb-1 font-semibold text-red-500 dark:text-red-300 group-hover:text-red-500 transition">
                  ⭐ Rating
                </label>

                <select className="w-full rounded-xl px-4 py-2.5 bg-white/80 dark:bg-black/60 backdrop-blur border border-red-300 dark:border-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 hover:border-red-400 transition-all duration-500 ease-out">
                  <option>All Ratings</option>
                  <option>9+ ⭐</option>
                  <option>8+ ⭐</option>
                  <option>7+ ⭐</option>
                  <option>6+ ⭐</option>
                  <option>5+ ⭐</option>
                </select>
              </div>

              {/* CLEAR BUTTON */}
              <Button
                content="Clear Filters"
                pattern="outline"
                className="rounded-xl dark:text-black! text-white"
              />
            </div>
          </div>

          {/* RIGHT: MOVIES (70%) */}
          <div className="md:col-span-7 bg-white dark:bg-black rounded-xl p-4 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 dark:text-white">
              Movies In{" "}
              <span className="text-red-500 underline">{locationName}</span>
            </h2>

            {/* GRID instead of horizontal scroll */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {movies.map((movie) => (
                <div key={movie.id}>
                  {/* IMAGE CARD */}
                  <div
                    onClick={() => navigate(`/movie/${movie.id}`)}
                    className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden cursor-pointer h-64 sm:h-80"
                  >
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* TEXT */}
                  <div className="mt-2">
                    <p className="text-sm font-semibold dark:text-white truncate">
                      {movie.title}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {movie.genre}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;
