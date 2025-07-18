
// import TrelloList from './TrelloList.jsx';
import { Plus } from 'lucide-react';

const BoardContent = () => {
  return (
    <div className="p-6 flex space-x-6 overflow-x-auto">
      <TrelloList title="Trello" />
      <TrelloList title="Name" />
      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 w-80 flex-shrink-0">
        <button className="flex items-center space-x-2 text-white hover:text-gray-200 w-full">
          <Plus className="w-4 h-4" />
          <span>Add another list</span>
        </button>
      </div>
    </div>
  );
}

export default BoardContent;