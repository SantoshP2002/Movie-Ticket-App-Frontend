import { useEffect, useState } from "react";
import { moviesImages } from "../constants";

const MovieCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const totalSlides = moviesImages.length;

  // PREV
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  // NEXT
  const nextSlide = () => {
    setCurrent((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  // SCREEN CHECK
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // AUTO SCROLL
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <div className="relative w-full overflow-hidden px-4 py-3 dark:bg-black">
      {/* SLIDES */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {moviesImages.map((img, index) => (
          <div key={index} className="w-full shrink-0 px-2">
            <img
              src={isMobile ? img.mobile : img.desktop}
              alt={`slide-${index}`}
              className={`rounded-2xl ${
                isMobile
                  ? "w-auto h-auto max-w-full object-contain mx-auto"
                  : "w-full h-75 object-cover"
              }`}
            />
          </div>
        ))}
      </div>

      {/* LEFT */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
      >
        ‹
      </button>

      {/* RIGHT */}
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-full"
      >
        ›
      </button>
    </div>
  );
};

export default MovieCarousel;
