import { IoCloudyNightSharp, IoSearch } from "react-icons/io5";
import Input from "../input";
import { useEffect, useState } from "react";
import Modal from "../modal";
import SearchModal from "../modal/SearchModal";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/user";
import LocationModal from "../modal/LocationModal";
import { FaLocationDot } from "react-icons/fa6";
import { getLocationFromCoords } from "../../utils";

type TTheme = "light" | "dark";
const activeTheme = (localStorage.getItem("theme") || "light") as TTheme;

const Navbar = () => {
  const navigate = useNavigate();
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [theme, setTheme] = useState<TTheme>(activeTheme);
  const [location, setLocation] = useState(() => {
    return localStorage.getItem("selectedLocation") || "Mumbai";
  });

  const { isLoggedIn, logout } = useUserStore();

  // ========================== THEME useEffect ===========================
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // ========================== Handle LocationSelect ===========================
  const handleLocationSelect = (loc: string) => {
    setLocation(loc);
    localStorage.setItem("selectedLocation", loc);
  };

  // ========================== LOCATION useEffect ===========================
  useEffect(() => {
    const savedLocation = localStorage.getItem("selectedLocation");
    if (savedLocation) return; // ✅ don't override user choice

    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const place = await getLocationFromCoords(latitude, longitude);

        if (place?.district && place?.state) {
          const loc = `${place.district}, ${place.state}`;
          setLocation(loc);
          localStorage.setItem("selectedLocation", loc);
        }
      },
      () => {
        console.log("Location permission denied");
      },
    );
  }, []);

  return (
    <>
      {/* ========================== SEARCH MODAL =========================== */}
      {isSearchOpen && (
        <Modal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          heading="Search Products"
          className="lg:min-w-xl bg-white dark:bg-black dark:text-white"
        >
          <SearchModal onClose={() => setIsSearchOpen(false)} />
        </Modal>
      )}
      {/* ========================== LOCATION MODAL =========================== */}
      {isLocationOpen && (
        <Modal
          isOpen={isLocationOpen}
          onClose={() => setIsLocationOpen(false)}
          heading="Select Location"
          className="lg:min-w-md bg-white dark:bg-black dark:text-white"
        >
          <LocationModal
            onSelect={handleLocationSelect}
            onClose={() => setIsLocationOpen(false)}
          />
        </Modal>
      )}

      {/* ========================== NAVBAR WITH BACKGROUND IMAGE =========================== */}
      <div
        className="relative px-4 sm:px-8 py-2 text-white 
          bg-[url('https://assets-in.bmscdn.com/discovery-catalog/collections/holi-parties-header-collection-202601270122.png')]
          bg-cover bg-center sm:bg-none sm:bg-white dark:sm:bg-black"
      >
        <div className="absolute inset-0 bg-black/30 dark:bg-black/50 sm:hidden"></div>

        {/* CONTENT */}
        <div className="relative z-10 flex justify-between items-center w-full">
          {/* ========================== LOGO =========================== */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
            <div className="flex items-center gap-1">
              <img
                src="https://www.magnetothemall.com/wp-content/uploads/2024/03/bookmyshow.png"
                alt="Movie Ticket Logo"
                className="w-20 lg:w-34 lg:h-10 mx-auto rounded-sm object-cover cursor-pointer text-3xl"
                onClick={() => navigate("/")}
              />
            </div>

            {/* ========================== SELECT LOCATION =========================== */}
            <div className="flex flex-row items-center justify-center gap-1 max-w-35 lg:max-w-60">
              <FaLocationDot size={20} className="text-red-600 shrink-0" />

              <span
                onClick={() => setIsLocationOpen(true)}
                className="cursor-pointer text-xs lg:text-sm font-medium text-black dark:text-white hover:text-red-400 truncate whitespace-nowrap overflow-hidden text-ellipsis"
              >
                {location}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* ========================== MOBILE: search icon =========================== */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex sm:hidden items-center justify-center w-10 h-10 bg-white dark:bg-black text-black dark:text-white rounded-full shadow-md"
            >
              <IoSearch size={20} />
            </button>

            {/* ========================== DESKTOP: centered search input =========================== */}

            <div className="hidden sm:block absolute left-1/2 -translate-x-1/2 w-64">
              <Input
                inputProps={{
                  placeholder: "Search movies",
                  type: "text",
                  onClick: () => setIsSearchOpen(true),
                }}
                icons={{ left: { icon: <IoSearch /> } }}
                className="border-b-4 border-r-4 px-5 lg:px-8 bg-white text-black placeholder-gray-500 dark:bg-black dark:text-white dark:placeholder-white border-gray-300 dark:border-gray-700 md:w-80! sm:w-60!"
              />
            </div>

            <div className="flex justify-center items-center gap-5">
              {/* ========================== SIGN UP Button =========================== */}
              {isLoggedIn ? (
                <Button
                  content="Logout"
                  pattern="outline"
                  className="w-20! rounded-2xl text-xs"
                  buttonProps={{
                    onClick: logout,
                  }}
                />
              ) : (
                <Button
                  content="Please Login!"
                  pattern="outline"
                  className="w-20! rounded-2xl text-xs"
                  buttonProps={{
                    onClick: () => navigate("/login"),
                  }}
                />
              )}

              {/* ========================== THEME TOGGLE (DARK AND LIGHT) =========================== */}
              <button
                onClick={toggleTheme}
                className="flex items-center justify-center rounded-full border-t border-l border-4 border-black bg-white text-black dark:border-white dark:bg-black dark:text-white w-10 h-10 cursor-pointer"
              >
                {theme === "dark" ? (
                  <TiWeatherPartlySunny />
                ) : (
                  <IoCloudyNightSharp />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
