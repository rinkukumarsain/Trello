import React from 'react';
import { Zap, Menu, Star, Users, MoreHorizontal } from 'lucide-react';

const BoardHeader = () => {
  return (
    <div className="bg-black bg-opacity-10 backdrop-blur-sm text-white px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">Project Working</h1>
        <span className="bg-gray-500 bg-opacity-30 px-2 py-1 rounded text-sm">🔒</span>
      </div>

      <div className="flex items-center space-x-4">
        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">SJ</span>
        </div>
        <Zap className="w-5 h-5 cursor-pointer hover:text-gray-300" />
        <Menu className="w-5 h-5 cursor-pointer hover:text-gray-300" />
        <Star className="w-5 h-5 cursor-pointer hover:text-gray-300" />
        <Users className="w-5 h-5 cursor-pointer hover:text-gray-300" />
        <button className="bg-gray-500 bg-opacity-30 hover:bg-opacity-40 px-4 py-2 rounded flex items-center space-x-2">
          <Users className="w-4 h-4" />
          <span>Share</span>
        </button>
        <MoreHorizontal className="w-5 h-5 cursor-pointer hover:text-gray-300" />
      </div>
    </div>
  );
}
export default BoardHeader;