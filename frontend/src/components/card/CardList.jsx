import React, { useEffect, useState } from 'react';
import { fetchListsByBoard, createList } from '../lib/api';
import { createCard } from '../lib/api';
import { Plus, CheckCircle, Paperclip } from 'lucide-react';

const KanbanBoard = ({ boardId }) => {
  const [lists, setLists] = useState([]);
  const [newListTitle, setNewListTitle] = useState('');

  useEffect(() => {
    loadLists();
  }, [boardId]);

  const loadLists = async () => {
    try {
      const res = await fetchListsByBoard(boardId);
      setLists(res.data?.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddList = async () => {
    if (!newListTitle.trim()) return;
    try {
      await createList({ board: boardId, title: newListTitle });
      setNewListTitle('');
      loadLists();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddCard = async (listId) => {
    const title = prompt('Enter card title:');
    if (!title?.trim()) return;
    try {
      await createCard({ list: listId, title });
      loadLists();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex gap-4 overflow-x-auto p-4 min-h-screen" style={{ backgroundImage: `url('/path/to/bg.jpg')`, backgroundSize: 'cover' }}>
      {lists.map((list) => (
        <div key={list._id} className="bg-black/80 text-white rounded-xl p-3 w-72 shrink-0">
          <div className="flex justify-between items-center mb-2 font-semibold text-lg">{list.title}</div>

          {/* Cards */}
          {list.cards?.map((card) => (
            <div key={card._id} className="bg-[#1f1f1f] p-3 rounded-lg mb-2 border border-white/10">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="text-green-400 w-4 h-4" />
                <p className="text-sm font-medium">{card.title}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-white/60 mt-1">
                <Paperclip className="w-3 h-3" />
                <span>{card.attachments?.length || 0}</span>
              </div>
            </div>
          ))}

          {/* Add Card Button */}
          <button
            onClick={() => handleAddCard(list._id)}
            className="mt-2 text-sm text-white/80 flex items-center gap-1 hover:text-white"
          >
            <Plus className="w-4 h-4" /> Add a card
          </button>
        </div>
      ))}

      {/* Add New List */}
      <div className="bg-white/10 text-white rounded-xl p-3 w-72 shrink-0">
        <input
          type="text"
          placeholder="New list title"
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
          className="w-full bg-transparent border border-white/20 p-2 rounded text-sm mb-2 placeholder-white/60"
        />
        <button
          onClick={handleAddList}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 rounded w-full"
        >
          + Add List
        </button>
      </div>
    </div>
  );
};

export default KanbanBoard;
