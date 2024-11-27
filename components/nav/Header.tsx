"use client"
import { Globe, HelpCircle, User } from 'lucide-react';

const Header: React.FC = () => {

  return (
    <header className=" w-full border-b border-gray-200 bg-white fixed z-10">
      <div className=" w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-black">✱</span>
              <span className="text-lg font-semibold text-black">Thumblyzer</span>
            </a>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button
              className="p-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200"
              aria-label="User profile"
            >
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
