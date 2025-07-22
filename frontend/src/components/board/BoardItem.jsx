// BoardItem.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateBoard, deleteBoard } from '../lib/api';

const BoardItem = ({ board, onUpdate, onDelete, isDetailView = false }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(board.title);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();

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
    if (e.key === 'Escape') {
      setTitle(board.title);
      setEditing(false);
    }
  };

  const handleBoardClick = () => {
    if (!editing && !isDetailView) {
      navigate(`/board/${board._id}`);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete "${board.title}"?`)) {
      try {
        setDeleteLoading(true);
        await deleteBoard(board._id);
        onDelete(board._id);
      } catch (err) {
        console.error('Delete failed:', err.message);
      } finally {
        setDeleteLoading(false);
      }
    }
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setEditing(true);
  };

  return (
    <div className="bg-black bg-opacity-10 backdrop-blur-sm p-4 rounded-lg shadow hover:shadow-lg transition-all border border-white border-opacity-20">
      <div className="flex flex-col gap-3">
        {editing ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleUpdate}
            onKeyDown={handleKeyDown}
            autoFocus
            className="w-full bg-white text-black p-2 rounded outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <h2
            onClick={handleBoardClick}
            className={`text-xl font-semibold text-white cursor-pointer hover:text-blue-300 transition-colors ${
              !isDetailView ? 'hover:underline' : ''
            }`}
          >
            {board.title}
          </h2>
        )}
        
        {/* Board metadata */}
        <div className="p-4 text-gray-900 rounded bg-gray-700">
          <p>Owner: {board.owner?.first_name} {board.owner?.last_name}</p>
          {board.members && board.members.length > 0 && (
            <p>Members: {board.members.length}</p>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2 justify-end">
          {!isDetailView && (
            <button
              onClick={handleBoardClick}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
            >
              Open
            </button>
          )}
          <button
            onClick={handleEditClick}
            disabled={editing}
            className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={deleteLoading}
            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {deleteLoading ? 'Deleting...' : 'Delete'}
          </button>
          {isDetailView && (
            <button
              onClick={() => navigate('/board')}
              className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors"
            >
              Back to Boards
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoardItem;
