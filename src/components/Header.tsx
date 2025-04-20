import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import Button from "./Button";
import { BsMenuUp } from "react-icons/bs";
// import ThemeToggle from "./ThemeToggle";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen((open) => !open);
  };

  return (
    <header className="fixed left-0 right-0 mx-auto bg-primary-tint text- max-h-14 h-full py-2 px-8 flex justify-between items-center shadow max-w-7xl mt-3 w-full rounded-full z-50">
      <Logo />

      {/* Desktop Nav */}
      <nav className="hidden md:flex">
        <ul className="flex justify-center items-center gap-5">
          {["Features", "Pricing", "About"].map((link, index) => (
            <li key={index}>
              <a
                href={`#${link.toLowerCase()}`}
                className="font-medium uppercase text-base tracking-wider hover:text-secondary hover:font-semibold transition-all duration-200"
              >
                {link}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop buttons */}
      <div className="hidden md:flex gap-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => navigate("/login")}
        >
          Log in
        </Button>
        <Button type="button" onClick={() => navigate("/sign-up")} size="sm">
          Sign Up
        </Button>
      </div>

      {/* Hamburger Icon (Mobile) */}
      <button
        type="button"
        className="md:hidden text-primary text-4xl transition-all duration-300"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <BsMenuUp />
      </button>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute h-screen top-[85px] left-0 right-0 bg-primary-tint shadow-md p-6 flex flex-col items-center space-y-10 z-10 md:hidden transition-all duration-300">
          {["Features", "Pricing", "About"].map((link, index) => (
            <a
              key={index}
              href={`#${link.toLowerCase()}`}
              className="font-medium uppercase text-lg hover:text-secondary hover:font-semibold transition-all duration-200"
              onClick={() => setIsOpen(false)}
            >
              {link}
            </a>
          ))}

          <div className="grid grid-cols-2 gap-3 w-full mt-10">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => navigate("/login")}
            >
              Log in
            </Button>
            <Button
              type="button"
              onClick={() => navigate("/sign-up")}
              size="sm"
            >
              Sign Up
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
