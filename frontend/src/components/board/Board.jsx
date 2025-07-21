import React, { useEffect, useState } from 'react';
import BoardBackground from '../../assets/board.jpg';
import { fetchBoards, createBoard } from '../lib/api';
import trello from '../../assets/trello.png';
import BoardItem from "./BoardItem"
const Board = () => {
  const [boards, setBoards] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [createLoading, setCreateLoading] = useState(false);

  const getBoards = async () => {
    try {
      const res = await fetchBoards();
      if (res.data.success && Array.isArray(res.data.data)) {
        setBoards(res.data.data);
      } else {
        setBoards([]);
      }
    } catch (err) {
      console.error('Fetch failed:', err.message);
      setBoards([]);
    }
  };

  useEffect(() => {
    getBoards();
  }, []);

  const handleCreateBoard = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      setCreateLoading(true);
      const res = await createBoard({ title: newTitle });
      if (res.data.success) {
        setNewTitle('');
        getBoards();
      }
    } catch (error) {
      console.error('Create board failed:', error.message);
    } finally {
      setCreateLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex  relative"
      style={{ backgroundImage: `url(${BoardBackground})` }}>
        <img src={trello}  className='w-20 h-20 bg-transparent'/>
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      <div className="relative z-10 w-full max-w-6xl px-6 py-8 ">
        <form
          onSubmit={handleCreateBoard}
          className="mb-6 flex flex-col sm:flex-row items-center gap-4 justify-center"
        >
          <input
            type="text"
            placeholder="Create board title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full sm:w-1/2 px-4 py-2 border border-gray-300 text-white rounded-md shadow-sm focus:outline-none focus:ring-2
             focus:ring-blue-500 placeholder:text-white"
          />
          <button
            type="submit"
            disabled={createLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {createLoading ? 'Creating...' : 'Create Board'}
          </button>
        </form>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {boards.length > 0 ? (
             boards.map((board) => (
          <BoardItem
          key={board._id}
          board={board}
          onUpdate={(id, newTitle) => {
          setBoards(prev =>
            prev.map(b => (b._id === id ? { ...b, title: newTitle } : b))
          );
        }}
          onDelete={(id) => {
          setBoards(prev => prev.filter(b => b._id !== id));
        }}
      />
    ))
  ) : (
      <p className="col-span-full text-center text-white">No boards found.</p>
    )}
      </div>

      </div>
    </div>
  );
};

export default Board;
