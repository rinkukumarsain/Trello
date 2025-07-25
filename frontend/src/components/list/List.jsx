import React, { useState, useEffect } from 'react';
import { createCard, fetchCardsByList, updateCard, deleteCard } from '../lib/api';
import { Plus, X, Edit2 } from 'lucide-react';
import CardModal from '../card/CardModel';

const List = ({ list, boardId, onDeleteList }) => {
  const [cards, setCards] = useState(list.cards || []);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [showAddCard, setShowAddCard] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openModalCard, setOpenModalCard] = useState(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetchCardsByList(list._id);
        if (response.data.success) {
          setCards(response.data.data || []);
        }
      } catch (error) {
        console.error('Error fetching cards:', error);
        setCards([]);
      }
    };

    fetchCards();
  }, [list._id]);

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
        setCards(prev => [...prev, response.data.data]);
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
        setCards(prev =>
          prev.map(card =>
            card._id === cardId
              ? { ...card, title: newTitle }
              : card
          )
        );
      }
    } catch (error) {
      console.error('Error updating card:', error);
    }
  };

  const handleDeleteCard = async (cardId) => {
    if (window.confirm('Are you sure you want to delete this card?')) {
      try {
        await deleteCard(cardId);
        setCards(prev => prev.filter(card => card._id !== cardId));
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

      <div className="space-y-2 mb-3">
        {cards.map(card => (
          <Card
            key={card._id}
            card={card}
            onUpdate={handleUpdateCard}
            onDelete={handleDeleteCard}
            editingCard={editingCard}
            setEditingCard={setEditingCard}
            onOpenModal={() => setOpenModalCard(card)}
          />
        ))}
      </div>

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

  const handleSave = () => {
    onUpdate(card._id, title);
    setEditingCard(null);
  };

  const handleCancel = () => {
    setTitle(card.title);
    setEditingCard(null);
  };

  return (
    <div className="bg-gray-500 rounded shadow p-2 hover:shadow-md transition-shadow">
      {isEditing ? (
        <div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
