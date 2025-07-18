import React from 'react';
import { Search, Grid3X3, Bell, HelpCircle } from 'lucide-react';

const TopNavBar = () => {
  return (
    <nav className="bg-black bg-opacity-20 backdrop-blur-sm text-white px-4 py-2 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
            <Grid3X3 className="w-5 h-5 text-blue-600" />
          </div>
          <span className="font-semibold">Trello</span>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search"
            className="bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 rounded px-10 py-2 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-30"
          />
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white font-medium">
          Create
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <span className="bg-purple-600 px-3 py-1 rounded text-sm font-medium">2 days left</span>
        <Bell className="w-5 h-5 cursor-pointer hover:text-gray-300" />
        <HelpCircle className="w-5 h-5 cursor-pointer hover:text-gray-300" />
        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">SJ</span>
        </div>
      </div>
    </nav>
  );
}
export default TopNavBar;