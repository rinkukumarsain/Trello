import React, { useState } from 'react';

const CardList= () =>{
  const [cards, setCards] = useState([
    { id: 1, title: 'Fix bug in login' },
    { id: 2, title: 'Update API docs' },
  ]);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddCard = () => {
    if (newCardTitle.trim() !== '') {
      setCards([...cards, { id: Date.now(), title: newCardTitle }]);
      setNewCardTitle('');
      setIsAdding(false);
    }
  };

  return (
    <div className="w-80 bg-gray-100 rounded-2xl shadow-md p-4 space-y-4">
      <h2 className="text-lg font-bold">To Do</h2>

      {cards.map((card) => (
        <div key={card.id} className="bg-white rounded-xl shadow p-3 hover:shadow-lg transition-all">
          <p className="text-sm font-medium text-gray-800">{card.title}</p>
        </div>
      ))}

      {isAdding ? (
        <div className="space-y-2">
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
            placeholder="Enter card title"
            value={newCardTitle}
            onChange={(e) => setNewCardTitle(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddCard}
              className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
            >
              Add
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setNewCardTitle('');
              }}
              className="text-gray-600 px-3 py-1 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full text-left text-sm text-blue-600 hover:underline"
        >
          + Add a card
        </button>
      )}
    </div>
  );
}

export default CardList;