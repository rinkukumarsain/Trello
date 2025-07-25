import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchBoardById, createList, updateList, deleteList, fetchListsByBoard } from '../lib/api';
import List from '../list/List';
import { Plus } from 'lucide-react';
import Navbar from '../pages/Navbar';
import BoardNavbar from './BoardNavbar';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

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

        const boardResponse = await fetchBoardById(id);
        if (boardResponse.data.success) {
          setBoard(boardResponse.data.data);
        }

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

  // Drag and Drop Handlers
  const handleDragEnd = (result) => {
    const { destination, source, type } = result;

    // Do nothing if dropped outside a droppable area
    if (!destination) return;

    // Do nothing if dropped in the same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Handle list reordering
    if (type === 'LIST') {
      const newLists = Array.from(lists);
      const [reorderedList] = newLists.splice(source.index, 1);
      newLists.splice(destination.index, 0, reorderedList);
      setLists(newLists);
      return;
    }

    // Handle card reordering/moving
    const sourceListIndex = lists.findIndex(list => list._id === source.droppableId);
    const destListIndex = lists.findIndex(list => list._id === destination.droppableId);

    if (sourceListIndex === -1 || destListIndex === -1) return;

    const sourceList = lists[sourceListIndex];
    const destList = lists[destListIndex];

    // Moving within the same list
    if (source.droppableId === destination.droppableId) {
      const newCards = Array.from(sourceList.cards || []);
      const [movedCard] = newCards.splice(source.index, 1);
      newCards.splice(destination.index, 0, movedCard);

      const newLists = [...lists];
      newLists[sourceListIndex] = {
        ...sourceList,
        cards: newCards,
      };

      setLists(newLists);
    } else {
      // Moving between different lists
      const sourceCards = Array.from(sourceList.cards || []);
      const destCards = Array.from(destList.cards || []);
      const [movedCard] = sourceCards.splice(source.index, 1);
      destCards.splice(destination.index, 0, movedCard);

      const newLists = [...lists];
      newLists[sourceListIndex] = {
        ...sourceList,
        cards: sourceCards,
      };
      newLists[destListIndex] = {
        ...destList,
        cards: destCards,
      };

      setLists(newLists);
    }
  };

  // Update cards in a specific list
  const updateListCards = (listId, newCards) => {
    setLists(prev => prev.map(list => 
      list._id === listId ? { ...list, cards: newCards } : list
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center bg-black justify-center">
        <div className="text-xl bg-black text-gray-600">Loading board...</div>
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
      <Navbar />
      <BoardNavbar board={board} />

      {/* List Section */}
      <div className="p-6">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="board" direction="horizontal" type="LIST">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`flex gap-4 overflow-x-auto pb-4 min-h-[400px] ${
                  snapshot.isDraggingOver ? 'bg-transparent bg-opacity-10 rounded-lg' : ''
                }`}
              >
                {/* Lists */}
                {lists.map((list, index) => (
                  <Draggable key={list._id} draggableId={list._id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={snapshot.isDragging ? 'transform rotate-2' : ''}
                      >
                        <List
                          list={list}
                          boardId={id}
                          onUpdateList={handleUpdateList}
                          onDeleteList={handleDeleteList}
                          updateListCards={updateListCards}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                
                {/* Add List */}
                {showAddList ? (
                  <div className="bg-black rounded-lg p-3 w-72 h-52 flex-shrink-0">
                    <input
                      type="text"
                      value={newListTitle}
                      onChange={(e) => setNewListTitle(e.target.value)}
                      placeholder="Enter list title..."
                      className="w-full text-gray-300 p-2 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleCreateList();
                        } else if (e.key === 'Escape') {
                          setShowAddList(false);
                          setNewListTitle('');
                        }
                      }}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleCreateList}
                        disabled={createLoading || !newListTitle.trim()}
                        className="bg-blue-900 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 disabled:opacity-50"
                      >
                        {createLoading ? 'Adding...' : 'Add List'}
                      </button>
                      <button
                        onClick={() => {
                          setShowAddList(false);
                          setNewListTitle('');
                        }}
                        className="bg-red-500 px-3 py-1 rounded text-sm hover:bg-red-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowAddList(true)}
                    className="bg-gray-600 bg-opacity-10 hover:bg-opacity-30 text-white justify-center rounded-lg p-3 w-72 flex-shrink-0 flex items-center gap-2  h-53 transition-colors"
                  >
                    <Plus size={16} />
                    Add another list
                  </button>
                )}
              </div>
            )}
          </Droppable>
        </DragDropContext>

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
