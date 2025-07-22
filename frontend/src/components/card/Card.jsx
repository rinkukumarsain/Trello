import React, { useState } from 'react';
import { updateCard, deleteCard } from '../lib/api'; // adjust the path as needed

const Card = ({ card, onDragStart, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState(card.description);
  const [loading, setLoading] = useState(false);

  const handleUpdateCard = async () => {
    try {
      setLoading(true);
      await updateCard(card._id, { description });
      setIsEditing(false);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCard = async () => {
    if (!window.confirm('Are you sure you want to delete this card?')) return;

    try {
      await deleteCard(card._id);
      onDelete(card._id); 
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div
      draggable
      onDragStart={onDragStart}
      className="bg-white p-3 rounded shadow cursor-move hover:shadow-md transition-shadow"
    >
      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            rows="3"
            disabled={loading}
          />
          <div className="flex gap-2">
            <button
              onClick={handleUpdateCard}
              className="px-3 py-1 bg-blue-500 text-white rounded"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-300 rounded"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteCard}
              className="px-3 py-1 bg-red-500 text-white rounded"
              disabled={loading}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div onClick={() => setIsEditing(true)}>
          <h3 className="font-medium">{card.description}</h3>
        </div>
      )}
    </div>
  );
};

export default Card;
