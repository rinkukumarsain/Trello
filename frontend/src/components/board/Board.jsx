// components/pages/Board.jsx
import React, { useEffect, useState } from 'react';
import BoardBackground from '../../assets/board.jpg';
import { fetchBoards, createBoard } from '../lib/api';
import BoardItem from './BoardItem';
import BoardNavbar from '../pages/BoardNavbar';
import Navbar from '../pages/Navbar';

const Board = () => {
  const [boards, setBoards] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [createLoading, setCreateLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const getBoards = async () => {
    try {
      setLoading(true);
      const res = await fetchBoards();
      if (res.data.success && Array.isArray(res.data.data)) {
        setBoards(res.data.data);
      } else {
        setBoards([]);
      }
    } catch (err) {
      console.error('Fetch failed:', err.message);
      setBoards([]);
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <div
        className="w-screen h-screen bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${BoardBackground})` }}
      >
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="relative z-10 text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-black w-full bg-cover bg-center bg-no-repeat flex flex-col relative"
      style={{ backgroundImage: `url(${BoardBackground})` }}
    >
      <div className="absolute inset-0 bg-black/40 z-0" />
      <div className="relative z-10 flex flex-col">

        {/* BoardNavbar at top with logo + input */}
        <Navbar
          newTitle={newTitle}
          setNewTitle={setNewTitle}
          handleCreateBoard={handleCreateBoard}
          createLoading={createLoading}
        />
      <BoardNavbar />
        {/* Board Cards */}
        <div className="w-full max-w-6xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {boards.length > 0 ? (
              boards.map((board) => (
                <BoardItem
                  key={board._id}
                  board={board}
                  isDetailView={false}
                  onUpdate={(boardId, newTitle) => {
                    setBoards((prev) =>
                      prev.map((b) => (b._id === boardId ? { ...b, title: newTitle } : b))
                    );
                  }}
                  onDelete={(boardId) => {
                    setBoards((prev) => prev.filter((b) => b._id !== boardId));
                  }}
                />
              ))
            ) : (
              <p className="col-span-full text-center text-white">
                No boards found.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;
