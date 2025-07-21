// BoardItem.jsx
import React, { useState } from 'react';
import { updateBoard } from '../lib/api';

const BoardItem = ({ board, onUpdate, onDelete }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(board.title);

  const handleUpdate = async () => {
    if (title.trim() && title !== board.title) {
      try {
        await updateBoard(board._id, { title });
        onUpdate(board._id, title);
      } catch (err) {
        console.error('Update failed', err.message);
      }
    }
    setEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleUpdate();
    }
  };

  return (
    <div className="bg-transparent p-4 rounded-lg shadow hover:shadow-lg transition-all flex justify-between items-center gap-2">
      {editing ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleUpdate}
          onKeyDown={handleKeyDown}
          autoFocus
          className="w-full bg-blue-100 text-black p-2 rounded outline-none"
        />
      ) : (
        <h2
          onClick={() => setEditing(true)}
          className="text-xl font-semibold text-gray-100 cursor-pointer"
        >
          {board.title}
        </h2>
      )}
      
    </div>
  );
};

export default BoardItem;
