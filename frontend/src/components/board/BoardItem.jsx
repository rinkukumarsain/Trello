// BoardItem.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateBoard, deleteBoard } from '../lib/api';
import Image from "../../assets/boardx.jpg";
import { Pencil, Trash2, Star } from 'lucide-react';

const BoardItem = ({ board, onUpdate, onDelete, isDetailView = false }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(board.title);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [ starred , setStarred] = useState(false);
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
    if (window.confirm(`Delete "${board.title}"?`)) {
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
 <div className="w-64 bg-white/10 border border-white/20 backdrop-blur-md rounded-xl shadow-md p-3 transition hover:shadow-xl">
  <div className="flex flex-col gap-2">
    <div className="relative group">
      <img
        src={Image}
        alt="Board"
        className="h-28 w-full object-cover rounded-md shadow"
      />

      <Star
        size={18}
        onClick={(e) => {
          e.stopPropagation();
          setStarred(!starred);
        }}
        className={`absolute top-2 right-2 cursor-pointer p-1 rounded-full transition
          ${starred ? 'text-yellow-400' : 'text-white/40'}
          ${starred ? 'bg-yellow-500/20' : 'bg-black/50'}
          group-hover:opacity-100 opacity-0 backdrop-blur-sm`}
        title={starred ? "Unstar" : "Star"}
      />
    </div>

    {/* Title and Icons */}
    <div className="flex justify-between items-center">
      {editing ? (
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleUpdate}
          onKeyDown={handleKeyDown}
          autoFocus
          className="flex-1 bg-white text-black p-1 text-sm rounded outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <h2
          onClick={handleBoardClick}
          className="text-base font-semibold cursor-pointer text-gray-300 hover:text-gray-400 transition-colors"
        >
          {board.title}
        </h2>
      )}

      <div className="flex items-center gap-1 ml-2">
        <button
          onClick={handleEditClick}
          disabled={editing}
          className="w-7 h-7 flex items-center justify-center border border-green-400 text-green-400 hover:bg-green-600 hover:text-white rounded-md transition disabled:opacity-50"
          title="Edit"
        >
          <Pencil size={14} />
        </button>

        <button
          onClick={handleDelete}
          disabled={deleteLoading}
          className="w-7 h-7 flex items-center justify-center border border-red-400 text-red-400 hover:bg-red-600 hover:text-white rounded-md transition disabled:opacity-50"
          title="Delete"
        >
          {deleteLoading ? <span className="text-xs">...</span> : <Trash2 size={14} />}
        </button>
      </div>
    </div>
  </div>
</div>

  );
};

export default BoardItem;
