import React, { useState, useEffect } from 'react';
import { createCard, fetchCardsByList, updateCard, deleteCard } from '../lib/api';
import { Plus, X, Edit2 } from 'lucide-react';
import CardModal from '../card/CardModel';
import { Droppable, Draggable } from '@hello-pangea/dnd';

const List = ({ list, boardId, onDeleteList, updateListCards }) => {
  const [cards, setCards] = useState(list.cards || []);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [showAddCard, setShowAddCard] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openModalCard, setOpenModalCard] = useState(null);

  // Sync cards with parent state when list.cards changes
  useEffect(() => {
    if (list.cards) {
      setCards(list.cards);
    }
  }, [list.cards]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetchCardsByList(list._id);
        if (response.data.success) {
          const fetchedCards = response.data.data || [];
          setCards(fetchedCards);
          // Update parent state with fetched cards
          if (updateListCards) {
            updateListCards(list._id, fetchedCards);
          }
        }
      } catch (error) {
        console.error('Error fetching cards:', error);
        setCards([]);
      }
    };

    // Only fetch if we don't have cards from parent
    if (!list.cards || list.cards.length === 0) {
      fetchCards();
    }
  }, [list._id, list.cards, updateListCards]);

  const handleAddCard = async () => {
    if (!newCardTitle.trim()) return;

    try {
      setLoading(true);
      const cardData = {
        title: newCardTitle,
        listId: list._id,
        boardId: boardId
      };

      const response = await createCard(cardData);
      if (response.data.success) {
        const newCard = response.data.data;
        setCards(prev => [...prev, newCard]);
        // Update parent state as well
        if (updateListCards) {
          updateListCards(list._id, [...cards, newCard]);
        }
        setNewCardTitle('');
        setShowAddCard(false);
      }
    } catch (error) {
      console.error('Error creating card:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCard = async (cardId, newTitle) => {
    try {
      const response = await updateCard(cardId, { title: newTitle });
      if (response.data.success) {
        const updatedCards = cards.map(card =>
          card._id === cardId
            ? { ...card, title: newTitle }
            : card
        );
        setCards(updatedCards);
        // Update parent state as well
        if (updateListCards) {
          updateListCards(list._id, updatedCards);
        }
      }
    } catch (error) {
      console.error('Error updating card:', error);
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      try {
        await deleteCard(cardId);
        const updatedCards = cards.filter(card => card._id !== cardId);
        setCards(updatedCards);
        // Update parent state as well
        if (updateListCards) {
          updateListCards(list._id, updatedCards);
        }
      } catch (error) {
        console.error('Error deleting card:', error);
      }
    }
  };

  return (
    <div className="bg-black rounded-lg p-3 w-72 flex-shrink-0">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-500">{list.title}</h3>
        <button
          onClick={() => onDeleteList(list._id)}
          className="text-gray-400 hover:text-red-500 p-1"
        >
          <X size={16} />
        </button>
      </div>

      <Droppable droppableId={list._id} type="CARD">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`space-y-2 mb-3 min-h-[100px] ${
              snapshot.isDraggingOver ? 'bg-gray-700 bg-opacity-30 rounded-lg p-2' : ''
            }`}
          >
            {cards.map((card, index) => (
              <Draggable key={card._id} draggableId={card._id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={snapshot.isDragging ? 'transform rotate-1 shadow-lg' : ''}
                  >
                    <Card
                      card={card}
                      onUpdate={handleUpdateCard}
                      onDelete={handleDeleteCard}
                      editingCard={editingCard}
                      setEditingCard={setEditingCard}
                      onOpenModal={() => setOpenModalCard(card)}
                      isDragging={snapshot.isDragging}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {showAddCard ? (
        <div className="bg-gray-800 rounded p-2 shadow">
          <textarea
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
            placeholder="Enter a title for this card..."
            className="w-full p-2 border text-gray-400 placeholder:text-gray-400 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="2"
            autoFocus
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleAddCard}
              disabled={loading || !newCardTitle.trim()}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Card'}
            </button>
            <button
              onClick={() => {
                setShowAddCard(false);
                setNewCardTitle('');
              }}
              className="text-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowAddCard(true)}
          className="w-full text-left text-gray-500 hover:bg-gray-600 rounded-xl p-2 flex items-center gap-2"
        >
          <Plus size={16} />
          Add a card
        </button>
      )}

      {/* Card Modal */}
      {openModalCard && (
        <CardModal
          card={openModalCard}
          listName={list.title}
          onClose={() => setOpenModalCard(null)}
        />
      )}
    </div>
  );
};

const Card = ({ card, onUpdate, onDelete, editingCard, setEditingCard, onOpenModal }) => {
  const [title, setTitle] = useState(card.title);
  const isEditing = editingCard === card._id;

  // Update local title when card.title changes
  useEffect(() => {
    setTitle(card.title);
  }, [card.title]);

  const handleSave = () => {
    if (title.trim()) {
      onUpdate(card._id, title);
      setEditingCard(null);
    }
  };

  const handleCancel = () => {
    setTitle(card.title);
    setEditingCard(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className="bg-gray-500 rounded shadow p-2 hover:shadow-md transition-shadow">
      {isEditing ? (
        <div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-1 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-2 py-1 rounded text-xs hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-start cursor-pointer" onClick={onOpenModal}>
          <h4 className="text-sm font-medium text-gray-800">{card.title}</h4>
          <div className="flex gap-1 ml-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setEditingCard(card._id);
              }}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <Edit2 size={12} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(card._id);
              }}
              className="text-gray-400 hover:text-red-500 p-1"
            >
              <X size={12} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
