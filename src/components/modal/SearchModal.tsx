import { useState } from "react";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";
import usePathParams from "../../hook/usePathParams";
import Input from "../input";

const SearchModal = ({ onClose }: { onClose: () => void }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { navigate } = usePathParams();

  const handleSubmit = (id?: string) => {
    if (id) {
      navigate(`/products/${id}`);
    } else if (searchQuery.trim()) {
      navigate(`/search?search=${searchQuery.trim()}`);
    }
    onClose();
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 pt-3 animate-[fadeIn_0.25s_ease-out]">
      {/* 🔍 Search Box */}
      <div className="relative">
        <Input
          icons={{
            left: {
              icon: (
                <IoSearchOutline className="w-5 h-5 text-sky-500 dark:text-sky-400" />
              ),
            },
          }}
          className="w-full pl-11 pr-4 py-2.5 rounded-lg outline-none bg-linear-to-r from-sky-50 to-blue-50 dark:from-sky-950 dark:to-blue-950 dark:text-white border border-sky-200 dark:border-sky-800 transition-all duration-300 shadow-md focus:shadow-sky-300"
          inputProps={{
            autoFocus: true,
            placeholder: "Search movies, events, shows...",
            value: searchQuery,
            type: "text",
            className: "dark:text-white placeholder-gray-400",
            onChange: (e) => setSearchQuery(e.target.value),
            onKeyDown: (e) => {
              if (e.key === "Enter" && searchQuery.trim()) {
                handleSubmit();
              }
            },
          }}
        />

        {/* ❌ Clear Icon */}
        {searchQuery && (
          <IoCloseOutline
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer text-gray-400 hover:text-red-500 transition"
            onClick={() => setSearchQuery("")}
          />
        )}
      </div>

      {/* 📌 Result Info */}
      {searchQuery.trim() && (
        <div className="flex items-center justify-between px-4 py-2 rounded-lg bg-sky-50 dark:bg-sky-900/20 text-sky-700 dark:text-sky-300 text-xs shadow-sm animate-[slideDown_0.2s_ease-out]">
          <span>
            Showing results for <strong>{searchQuery}</strong>
          </span>
        </div>
      )}

      {/* 🧊 Empty State */}
      {!searchQuery.trim() && (
        <div className="flex-1 flex items-center justify-center text-sm text-gray-400 animate-[fadeIn_0.3s_ease-out]">
          Start typing to search Movie
        </div>
      )}
    </div>
  );
};

export default SearchModal;
