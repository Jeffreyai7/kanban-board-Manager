import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../constants';
// import Button from "./Button";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white dark:bg-gray-900 dark:shadow-gray-800 shadow-md py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          
      <Link to="/" className="w-20">
        <img src="/images/logo.png" alt="Logo" className="w-full relative z-50" />
      </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="text-gray-900 dark:text-gray-200 hover:text-[#2B3089] dark:hover:text-[#1D9EE2] font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="login" 
              className="text-gray-900  dark:text-gray-200 hover:text-[#2B3089] dark:hover:text-[#1D9EE2] font-medium transition-colors"
            >
              Log in
            </Link>
            <Link to="sign-up" 
              className="bg-[#2B3089] dark:bg-[#1D9EE2] text-white px-5 py-2 rounded-lg hover:bg-[#1D9EE2] dark:hover:bg-[#2B3089] transition-colors duration-300 font-medium"
            >
             Sign up
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="relative z-50 md:hidden text-gray-900 dark:text-gray-200 transition-all duration-300 ease-in-out"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute z-30 top-0 h-screen left-0 right-0 bg-white dark:bg-gray-900 text-white shadow-lg dark:shadow-gray-800 py-[30%] px-4 transition-all duration-300 ease-in-out">
            <nav className="flex flex-col space-y-4">
              {NAV_LINKS.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  className="text-gray-900 dark:text-gray-200 hover:text-[#2B3089] dark:hover:text-[#1D9EE2] font-medium py-2 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 flex flex-col space-y-3">
                <a 
                  href="#login" 
                  className="text-gray-900 dark:text-gray-200 hover:text-[#2B3089] dark:hover:text-[#1D9EE2] font-medium py-2 transition-colors"
                >
                  Log in
                </a>
                <a 
                  href="#signup" 
                  className="bg-[#2B3089] dark:bg-[#1D9EE2] text-white px-5 py-3 rounded-lg text-center hover:bg-[#1D9EE2] dark:hover:bg-[#2B3089] transition-colors duration-300 font-medium"
                >
                  Get Started
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;