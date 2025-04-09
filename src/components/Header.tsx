import { useState } from "react";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((open) => !open);
  };

  return (
    <header className="relative py-6 px-6 flex justify-between items-center shadow">
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
                className="font-medium text-2xl hover:text-blue-600 transition-colors"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop buttons */}
      <div className="hidden md:flex gap-4">
        <button className="border border-blue-600 cursor-pointer rounded-2xl px-4 py-1">
          Log in
        </button>
        <button className="bg-blue-600 border text-white border-blue-600 cursor-pointer rounded-2xl px-4 py-1">
          Sign Up
        </button>
        <button className="md:hidden">
          <div className="bg-blue-800 w-6 h-6"></div>
        </button>
      </div>

      {/* Hamburger Icon (Mobile) */}
      <button
        className="md:hidden"
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
        <div className="absolute top-[70%] left-0 w-full bg-white shadow-md p-6 flex flex-col items-start space-y-4 z-10 md:hidden transition-all duration-300">
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

          <hr className="w-full border-gray-200" />

          <button className="w-full border border-blue-600 rounded-2xl py-2 text-center">
            Log in
          </button>
          <button className="w-full bg-blue-600 text-white rounded-2xl py-2 text-center">
            Sign Up
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
