import React, { useEffect, useState } from 'react';
import {
  Rocket,
  Zap,
  Filter,
  Star,
  Users,
  MoreHorizontal,
} from 'lucide-react';

const BoardNavbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        setUser(null);
      }
    }
  }, []);

  const getUserInitials = () => {
    if (!user) return 'U';

    const firstName = user.first_name || '';
    const lastName = user.last_name || '';

    if (!firstName && !lastName) return 'U';

    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();

    return firstInitial + lastInitial;
  };

  return (
    <div className="w-full px-4 py-3 bg-gray-700 text-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Board Title */}
        <div className="flex items-center gap-2 text-white font-semibold text-sm">
          <span className="capitalize text-2xl text-gray-200">Boards</span>
        </div>

        {/* Right: Action Icons */}
        <div className="flex items-center gap-4 text-white text-sm">
          <div className="bg-red-600 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold">
            {getUserInitials()}
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
