import { useState } from "react";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((open) => !open);
  };

  return (
    <header className="fixed bg-[#f9f9f9] max-h-20 h-full py-6 px-6 flex justify-between items-center shadow w-full">
      <div className="flex gap-1 items-center">
        <div className="flex gap-0.5 border border-gray-200 rounded p-1">
          <div className="h-6 w-2 bg-blue-700 rounded"></div>
          <div className="h-4 w-2 bg-blue-700 rounded"></div>
        </div>
        <p className="font-bold text-2xl">Kanban</p>
      </div>

      {/* Desktop Nav */}
      <nav className="hidden md:flex">
        <ul className="flex justify-center items-center gap-5">
          {["Features", "Pricing", "About"].map((link, index) => (
            <li key={index}>
              <a
                href={`#${link.toLowerCase()}`}
                className="font-medium text-lg hover:text-blue-600 transition-colors"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop buttons */}
      <div className="hidden md:flex gap-4">
        <button className="border border-blue-700 cursor-pointer rounded-2xl px-4 py-1 hover:bg-gray-100 transition-all duration-300">
          Log in
        </button>
        <button className="bg-blue-700 hover:bg-blue-900 border text-white border-blue-700 cursor-pointer rounded-2xl px-4 py-1 transition-all duration-300">
          Sign Up
        </button>
        <button className="md:hidden">
          <div className="bg-blue-800 w-6 h-6"></div>
        </button>
      </div>

      {/* Hamburger Icon (Mobile) */}
      <button
        className="md:hidden transition-all duration-300"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <div className="space-y-1">
          <span className="block w-6 h-0.5 bg-blue-800"></span>
          <span className="block w-6 h-0.5 bg-blue-800"></span>
          <span className="block w-6 h-0.5 bg-blue-800"></span>
        </div>
      </button>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute h-screen top-[70%] left-0 right-0 bg-[#f9f9f9] shadow-md p-6 flex flex-col items-center space-y-10 z-10 md:hidden transition-all duration-300">
          {["Features", "Pricing", "About"].map((link, index) => (
            <a
              key={index}
              href={`#${link.toLowerCase()}`}
              className="text-lg font-medium text-gray-800 hover:text-blue-600"
              onClick={() => setIsOpen(false)}
            >
              {link}
            </a>
          ))}

          <div className="grid grid-cols-2 gap-3 w-full mt-10">
            <button className="w-full border border-blue-600 rounded-2xl py-2 text-center">
              Log in
            </button>
            <button className="w-full bg-blue-600 text-white rounded-2xl py-2 text-center">
              Sign Up
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
