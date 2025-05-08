import React from 'react'; 
import { Link } from 'react-router-dom';
import { BsTwitterX, BsInstagram, BsLinkedin } from 'react-icons/bs';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 dark:text-white py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 md:gap-12">
          <div className="lg:col-span-2">
            <Link to="/" className="w-4">
              <img src="/images/logo.png" alt="logo" className='w-20' />
            </Link>
            <p className="mt-4 text-gray-600 dark:text-white max-w-xs">
              TaskCraft helps you organize work with intuitive drag and drop task management, 
              customizable workflows, and powerful collaboration tools.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 dark:text-white dark:hover:text-gray-200 hover:text-[#2B3089] transition-colors">
                <BsTwitterX className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 dark:text-white dark:hover:text-gray-200 hover:text-[#2B3089] transition-colors">
                <BsLinkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 dark:text-white dark:hover:text-gray-200 hover:text-[#2B3089] transition-colors">
                <BsInstagram className="w-5 h-5" />
              </a>

            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Product</h3>
            <ul className="space-y-3">
              <li><a href="#features" className="text-gray-600 dark:text-white dark:hover:text-gray-200 hover:text-[#2B3089] transition-colors">Features</a></li>
              <li><a href="#" className="text-gray-600 dark:text-white dark:hover:text-gray-200 hover:text-[#2B3089] transition-colors">Integrations</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h3>
            <ul className="space-y-3">
       
              <li><a href="#" className="text-gray-600 dark:text-white dark:hover:text-gray-200 hover:text-[#2B3089] transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-600 dark:text-white dark:hover:text-gray-200 hover:text-[#2B3089] transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-600 dark:text-white dark:hover:text-gray-200 hover:text-[#2B3089] transition-colors">Community</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-600 dark:text-white dark:hover:text-gray-200 hover:text-[#2B3089] transition-colors">About Us</a></li>
      
              <li><a href="#" className="text-gray-600 dark:text-white dark:hover:text-gray-200 hover:text-[#2B3089] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 dark:text-white dark:hover:text-gray-200 hover:text-[#2B3089] transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm dark:text-white">
              &copy; {new Date().getFullYear()} TaskCraft. All rights reserved.
            </p>
            <div className="mt-4 md:mt-0">
              <ul className="flex space-x-6 text-sm text-gray-500">
                <li><a href="#" className="hover:text-[#2B3089] transition-colors dark:text-white dark:hover:text-gray-200">Privacy</a></li>
                <li><a href="#" className="hover:text-[#2B3089] transition-colors dark:text-white dark:hover:text-gray-200">Terms</a></li>
                <li><a href="#" className="hover:text-[#2B3089] transition-colors dark:text-white dark:hover:text-gray-200">Cookies</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;