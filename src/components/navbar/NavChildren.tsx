import { useNavigate } from "react-router-dom";

const NavChildren = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100 text-black shadow dark:bg-gray-900 dark:text-white overflow-x-hidden">
      <div className="mx-auto flex lg:h-10 max-w-7xl items-center justify-between px-3 sm:px-4 text-xs sm:text-sm">
        {/* LEFT SIDE */}

        {/* 📱 MOBILE VIEW */}
        <div className="flex sm:hidden items-center gap-1 overflow-x-auto whitespace-nowrap scrollbar-hide">
          <div className="flex flex-col items-center min-w-15 cursor-pointer">
            <img
              src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:w-300/icd-movies-collection-202201201113.png"
              alt="Movies"
              className="w-16 h-16 object-contain"
            />
          </div>

          <div className="flex flex-col items-center min-w-15 cursor-pointer">
            <img
              src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:w-300/hsbc-two-liner-collection-202511250414.png"
              alt="Stream"
              className="w-16 h-16 object-contain"
            />
          </div>
          <div className="flex flex-col items-center min-w-15 cursor-pointer">
            <img
              src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:w-300/icd-music-shows-collection-202201201113.png"
              alt="Stream"
              className="w-16 h-16 object-contain"
            />
          </div>
          <div className="flex flex-col items-center min-w-15 cursor-pointer">
            <img
              src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:w-300/icc-tonav-final3-collection-202512040547.png"
              alt="Stream"
              className="w-16 h-16 object-contain"
            />
          </div>
          <div className="flex flex-col items-center min-w-15 cursor-pointer">
            <img
              src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:w-300/icd-plays-collection-202201201113.png"
              alt="Stream"
              className="w-16 h-16 object-contain"
            />
          </div>
          <div className="flex flex-col items-center min-w-15 cursor-pointer">
            <img
              src="https://assets-in.bmscdn.com/discovery-catalog/collections/tr:w-800,h-800:w-300/icd-comedy-shows-collection-202201201113.png"
              alt="Stream"
              className="w-16 h-16 object-contain"
            />
          </div>
        </div>

        {/* LEFT SIDE (desktop) */}
        <div className="hidden sm:flex items-center gap-4 text-gray-900 dark:text-gray-400">
          {["Movies", "Stream", "Events", "Plays", "Sports", "Activities"].map(
            (item) => (
              <span
                key={item}
                onClick={() => navigate(`/${item.toLowerCase()}`)}
                className="relative cursor-pointer transition-colors duration-200 hover:text-red-400 dark:hover:text-red-400 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-red-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item}
              </span>
            ),
          )}
        </div>

        {/* RIGHT SIDE (desktop) */}
        <div className="hidden sm:flex items-center gap-4 text-gray-900 dark:text-gray-400">
          {["ListYourShow", "Corporates", "Offers", "Gift Cards"].map(
            (item) => (
              <span
                key={item}
                className="relative cursor-pointer transition-colors duration-200 hover:text-red-400 dark:hover:text-red-400 after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-0 after:bg-red-400 after:transition-all after:duration-300 hover:after:w-full"
              >
                {item}
              </span>
            ),
          )}
        </div>
      </div>
    </div>
  );
};

export default NavChildren;
