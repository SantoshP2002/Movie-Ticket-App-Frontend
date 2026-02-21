import { movies } from "../constants";


const RecommendedMovies = () => {
  return (
    <div className="w-full h-full py-2 dark:bg-black">
      <div className="mx-auto dark:text-white px-4 sm:px-8 lg:px-16">
        <h1 className="text-2xl lg:text-4xl text-center my-4">
          Recommended Movies
        </h1>

        {/* Needle Line */}
        <span className="mx-auto block h-0.5 w-[90%] bg-linear-to-r from-transparent via-gray-400 to-transparent dark:via-gray-500" />

        {/* MOVIES SCROLL */}
        <div className="mt-4 flex gap-6 overflow-x-auto scrollbar-hide pb-2">
          {movies.map((movie) => (
            <div key={movie.id} className="min-w-45 sm:min-w-55">
              {/* IMAGE CARD */}
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md overflow-hidden cursor-pointer h-72.5 sm:h-90  ">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* TEXT OUTSIDE CARD */}
              <div className="mt-2">
                <p className="text-sm font-semibold dark:text-white">
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
  );
};

export default RecommendedMovies;
