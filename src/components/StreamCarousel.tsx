import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { slides } from "../constants";

const StreamCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const total = slides.length;

  // CHECK SCREEN
  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // AUTO SLIDE
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [total]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? total - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === total - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl">
      {/* SLIDER */}
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`w-full shrink-0 relative ${
              isMobile ? "h-72 flex justify-center items-center" : "h-112.5"
            }`}
          >
            {/*  MOBILE: ONLY POSTER */}
            {isMobile ? (
              <img
                src={slide.poster}
                alt={slide.title}
                className="h-full rounded-xl shadow-lg object-contain"
              />
            ) : (
              <>
                {/* DESKTOP BG */}
                <img
                  src={slide.bg}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />

                {/* DESKTOP CONTENT */}
                <div className="relative z-10 flex h-full items-center gap-8 px-10 text-white">
                  <img
                    src={slide.poster}
                    className="h-64 w-44 rounded-xl shadow-lg"
                  />

                  <div className="max-w-xl">
                    <img src={slide.premiere} className="h-5 mb-3" />
                    <p className="text-sm mb-3">{slide.text}</p>
                    <h2 className="text-3xl font-bold mb-2">{slide.title}</h2>
                    <p className="text-sm text-gray-300 mb-3">
                      {slide.duration} • {slide.genre} • {slide.language}
                    </p>
                    <p className="text-sm text-gray-200">{slide.desc}</p>

                    <div className="mt-4 flex gap-3">
                      <button className="bg-red-500 px-5 py-2 rounded-lg">
                        ▶ Watch Now
                      </button>
                      <button className="bg-white/20 px-5 py-2 rounded-lg">
                        + Add
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* CONTROLS */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-xl"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-2 rounded-xl"
      >
        <FaChevronRight />
      </button>
    </div>
  );
};

export default StreamCarousel;
