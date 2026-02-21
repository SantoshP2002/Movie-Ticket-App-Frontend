import { useEffect, useState } from "react";
import { MdLocationOn } from "react-icons/md";

type Props = {
  onSelect: (loc: string) => void;
  onClose: () => void;
};

type LocationResult = {
  display_name: string;
};

// ✅ DEFAULT 7 LOCATIONS
const defaultLocations: LocationResult[] = [
  { display_name: "Mumbai, Maharashtra" },
  { display_name: "Delhi, India" },
  { display_name: "Bengaluru, Karnataka" },
  { display_name: "Hyderabad, Telangana" },
  { display_name: "Pune, Maharashtra" },
  { display_name: "Chennai, Tamil Nadu" },
  { display_name: "Kolkata, West Bengal" },
];

const fetchLocations = async (query: string): Promise<LocationResult[]> => {
  if (!query) return [];

  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&q=${query}`,
  );

  return res.json();
};

const LocationModal = ({ onSelect, onClose }: Props) => {
  const [search, setSearch] = useState("");
  const [focused, setFocused] = useState(false);
  const [locations, setLocations] =
    useState<LocationResult[]>(defaultLocations);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delay = setTimeout(async () => {
      if (!search.trim()) {
        setLocations(defaultLocations); // ✅ show default
        return;
      }

      setLoading(true);
      const data = await fetchLocations(search);
      setLocations(data.slice(0, 7)); // ✅ max 7 results
      setLoading(false);
    }, 400);

    return () => clearTimeout(delay);
  }, [search]);

  return (
    <div className="flex flex-col h-[60vh] animate-fadeIn">
      {/* 🔍 SEARCH INPUT */}
      <div
        className={`relative transition-all duration-300 ${
          focused ? "scale-[1.02]" : "scale-100"
        }`}
      >
        <MdLocationOn
          size={20}
          className={`absolute left-3 top-1/2 -translate-y-1/2
          ${focused ? "text-sky-500 scale-110" : "text-gray-400"}`}
        />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Search city or state"
          className="w-full pl-11 pr-4 py-2.5 rounded-lg outline-none bg-linear-to-r from-sky-50 to-blue-50 dark:from-sky-950 dark:to-blue-950 dark:text-white border border-sky-200 dark:border-sky-800 shadow-md"
        />
      </div>

      {/* 📍 LOCATION LIST */}
      <div className="flex-1 overflow-y-auto mt-3 scrollbar-hide">
        {loading && (
          <p className="text-center text-sm text-gray-400 mt-6">Searching...</p>
        )}

        <ul className="space-y-1">
          {locations.map((loc, i) => (
            <li
              key={i}
              onClick={() => {
                localStorage.setItem("selectedLocation", loc.display_name);
                onSelect(loc.display_name);
                onClose();
              }}
              className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md text-sm transition-all duration-200 hover:bg-sky-100 dark:hover:bg-sky-900 hover:text-sky-600"
            >
              <MdLocationOn size={16} className="opacity-70" />
              {loc.display_name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LocationModal;
