import React from 'react';
import { MoreHorizontal, Plus } from 'lucide-react';

const TrelloList = ({ title }) => {
  return (
    <div className="bg-gray-100 rounded-lg p-4 w-80 flex-shrink-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-800">{title}</h2>
        <MoreHorizontal className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800" />
      </div>

      {title === 'Trello' && (
        <div className="bg-white rounded-lg p-3 mb-3 shadow-sm border border-blue-300">
          <div className="text-sm text-gray-800 mb-2">Data</div>
          <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded inline-block">
            💡 This card is a template.
          </div>
        </div>
      )}

      <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 w-full">
        <Plus className="w-4 h-4" />
        <span>Add a card</span>
      </button>
    </div>
  );
}
