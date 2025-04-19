import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar: React.FC = () => {
  return (
    <div className="w-full max-w-md ml-auto flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
      <FaSearch size={14} className="fill-gray-400 font-medium" />
      <input type="text" placeholder="Search" className="w-full outline-none" />
    </div>
  );
};

export default SearchBar;
