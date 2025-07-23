import React from 'react';
import {
  ChevronDown,
  Rocket,
  Zap,
  Filter,
  Star,
  Users,
  MoreHorizontal,
} from 'lucide-react';

const BoardNavbar = () => {
  return (
    <div className="w-full px-4 py-3 bg-gray-700 text-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Board Title */}
        <div className="flex items-center gap-2 text-white font-semibold text-sm">
          <span className="capitalize text-2xl text-gray-200">Boards</span>
          <span className="text-xs">
            {/* <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 inline" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.193l3.71-3.963a.75.75 0 111.08 1.04l-4.24 4.53a.75.75 0 01-1.08 0L5.25 8.27a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
            </svg> */}
          </span>
        </div>

        {/* Right: Action Icons */}
        <div className="flex items-center gap-4 text-white text-sm">
          <div className="bg-red-600 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold">
            SJ
          </div>
          <Rocket size={16} className="cursor-pointer hover:opacity-80" />
          <Zap size={16} className="cursor-pointer hover:opacity-80" />
          <Filter size={16} className="cursor-pointer hover:opacity-80" />
          <Star size={16} className="cursor-pointer hover:opacity-80" />
          <Users size={16} className="cursor-pointer hover:opacity-80" />

          <button className="bg-gray-200 text-black text-xs px-3 py-1 rounded hover:bg-gray-300">
            Share
          </button>
          <MoreHorizontal size={16} className="cursor-pointer hover:opacity-80" />
        </div>
      </div>
    </div>
  );
};

export default BoardNavbar;
