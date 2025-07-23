import React from 'react';
import {
  Rocket,
  Zap,
  Filter,
  Star,
  Users,
  MoreHorizontal,
} from 'lucide-react';

const BoardNavbar = ({ board }) => {
  if (!board) return null;

  return (
    <div className="w-full px-4 py-3 bg-gray-700 text-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Board Title and Owner */}
        <div className="flex items-center gap-3 text-white font-semibold text-sm">
          <span className="capitalize text-gray-200 text-lg">{board.title}</span>
        </div>
        {/* Avatars and Action Icons */}
        <div className="flex items-center gap-4 text-white text-sm">
          {/* Initials for owner and members */}
          <div className="flex items-center gap-1">
            {/* Owner Initials */}
            {board.owner && (
              <div
                title={`${board.owner.first_name} ${board.owner.last_name}`}
                className="bg-red-600 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold uppercase"
              >
                {(board.owner.first_name?.[0] || '') + (board.owner.last_name?.[0] || '')}
              </div>
            )}

            {/* Member Initials */}
            {board.members?.map((member, index) => (
              <div
                key={index}
                title={`${member.first_name} ${member.last_name}`}
                className="bg-blue-600 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold uppercase"
              >
                {(member.first_name?.[0] || '') + (member.last_name?.[0] || '')}
              </div>
            ))}
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
