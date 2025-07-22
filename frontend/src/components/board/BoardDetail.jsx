import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBoardById, createList, updateList, deleteList, fetchListsByBoard } from '../lib/api';
import List from '../list/List';
import { Plus, ArrowLeft } from 'lucide-react';

const BoardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [lists, setLists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddList, setShowAddList] = useState(false);
  const [newListTitle, setNewListTitle] = useState('');
  const [createLoading, setCreateLoading] = useState(false);

  // Fetch board and its lists
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch board details
        const boardResponse = await fetchBoardById(id);
        if (boardResponse.data.success) {
          setBoard(boardResponse.data.data);
        }

        // Fetch lists for this board
        const listsResponse = await fetchListsByBoard(id);
        if (listsResponse.data.success) {
          setLists(listsResponse.data.data || []);
        }
      } catch (error) {
        console.error('Error fetching board data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleCreateList = async () => {
    if (!newListTitle.trim()) return;

    try {
      setCreateLoading(true);
      const listData = {
        title: newListTitle,
        boardId: id
      };
      
      const response = await createList(listData);
      if (response.data.success) {
        setLists(prev => [...prev, response.data.data]);
        setNewListTitle('');
        setShowAddList(false);
      }
    } catch (error) {
      console.error('Error creating list:', error);
    } finally {
      setCreateLoading(false);
    }
  };

  const handleUpdateList = async (listId, newTitle) => {
    try {
      const response = await updateList(listId, { title: newTitle });
      if (response.data.success) {
        setLists(prev =>
          prev.map(list =>
            list._id === listId ? { ...list, title: newTitle } : list
          )
        );
      }
    } catch (error) {
      console.error('Error updating list:', error);
    }
  };

  const handleDeleteList = async (listId) => {
    if (window.confirm('Are you sure you want to delete this list and all its cards?')) {
      try {
        await deleteList(listId);
        setLists(prev => prev.filter(list => list._id !== listId));
      } catch (error) {
        console.error('Error deleting list:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center bg-black justify-center">
        <div className="text-xl bg-black  text-gray-600">Loading board...</div>
      </div> 
    );
  }

  if (!board) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-xl text-black mb-4">Board not found</div>
        <button
          onClick={() => navigate('/board')}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Back to Boards
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500">
      {/* Header */}
      <div className="bg-blue-400 bg-opacity-20 backdrop-blur-sm border-b border-white border-opacity-30">
        <div className="max-w-full px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/board')}
                className="text-black hover:bg-gray-300 hover:bg-opacity-20 p-2 rounded transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-2xl font-bold text-white">{board.title}</h1>
            </div>
            <div className="text-white text-sm">
              <span>Owner: {board.owner?.first_name} {board.owner?.last_name}</span>
              {board.members && board.members.length > 0 && (
                <span className="ml-4">Members: {board.members.length}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex gap-4 overflow-x-auto pb-4">
          {/* Existing Lists */}
          {lists.map(list => (
            <List
              key={list._id}
              list={list}
              boardId={id}
              onUpdateList={handleUpdateList}
              onDeleteList={handleDeleteList}
            />
          ))}

          {/* Add List Section */}
          {showAddList ? (
            <div className="bg-gray-100 rounded-lg p-3 w-72 flex-shrink-0">
              <input
                type="text"
                value={newListTitle}
                onChange={(e) => setNewListTitle(e.target.value)}
                placeholder="Enter list title..."
                className="w-full p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleCreateList();
                  }
                  if (e.key === 'Escape') {
                    setShowAddList(false);
                    setNewListTitle('');
                  }
                }}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleCreateList}
                  disabled={createLoading || !newListTitle.trim()}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 disabled:opacity-50"
                >
                  {createLoading ? 'Adding...' : 'Add List'}
                </button>
                <button
                  onClick={() => {
                    setShowAddList(false);
                    setNewListTitle('');
                  }}
                  className="text-gray-500 px-3 py-1 rounded text-sm hover:bg-gray-200"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowAddList(true)}
              className="bg-gray-600 bg-opacity-20 hover:bg-opacity-30 text-white rounded-lg p-3 w-72 flex-shrink-0 flex items-center gap-2 transition-colors"
            >
              <Plus size={16} />
              Add another list
            </button>
          )}
        </div>

        {/* Empty State */}
        {lists.length === 0 && !showAddList && (
          <div className="text-center text-white mt-12">
            <h2 className="text-xl font-semibold mb-4">This board is empty</h2>
            <p className="mb-6">Add your first list to get started!</p>
            <button
              onClick={() => setShowAddList(true)}
              className="bg-white text-blue-500 px-6 py-2 rounded font-medium hover:bg-gray-100 transition-colors"
            >
              Add a list
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardDetail;
