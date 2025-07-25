import React, { useState, useEffect } from 'react';
import trello from '../../assets/trello.png';
import { Search, Bell, HelpCircle, Megaphone, Grid } from 'lucide-react';

const Navbar = ({
  newTitle,
  setNewTitle,
  handleCreateBoard,
  createLoading,
}) => {
  const [user, setUser] = useState(null);
  
  // Get user data from localStorage on component mount
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
    if (!user) return 'U'; // Default fallback
    
    const firstName = user.first_name || '';
    const lastName = user.last_name || '';
    
    if (!firstName && !lastName) return 'U';
    
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    
    return firstInitial + lastInitial;
  };

  return (
    <nav className="w-full px-4 py-2 bg-gray-900 text-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        {/* Left: Sidebar + Logo */}
        <div className="flex items-center gap-2">
          <button className="rounded hover:bg-gray-700">
            <Grid size={22} />
          </button>
          <img src={trello} alt="Trello Logo" className="w-18" />
        </div>

        {/* Center: Search + Create */}
        <form
          onSubmit={handleCreateBoard}
          className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 w-[60%] max-w-xl"
        >
          <div className="flex items-center px-3 py-2 border border-gray-600 rounded-md w-full bg-[#22272b]">
            <Search size={16} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Create board title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="bg-transparent outline-none text-sm text-white w-full placeholder:text-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={createLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-4 py-2 rounded-md disabled:opacity-50"
          >
            {createLoading ? 'Creating...' : 'Create'}
          </button>
        </form>

        {/* Right: Icons */}
        <div className="flex items-center gap-4 ml-auto">
          <button className="hover:bg-gray-700 p-2 rounded">
            <Megaphone size={16} />
          </button>
          <button className="hover:bg-gray-700 p-2 rounded">
            <Bell size={16} />
          </button>
          <button className="hover:bg-gray-700 p-2 rounded">
            <HelpCircle size={16} />
          </button>
          <div className="bg-red-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold">
            {getUserInitials()}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
