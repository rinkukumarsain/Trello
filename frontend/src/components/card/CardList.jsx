import React, { useEffect, useState } from 'react';
import Card from './Card';
import {
  fetchAllLists,
  createCard,
  fetchListsByBoard
} from '../lib/api'; // update path if needed
import { axiosInstance } from '../lib/axios';

const KanbanBoard = () => {
  const [columns, setColumns] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const listRes = await fetchAllLists();
        const lists = listRes.data?.data || [];

        const columnsData = {};

        for (const list of lists) {
          const cardRes = await axiosInstance.get(`/card/${list._id}`);
          const cards = cardRes.data?.data || [];

          columnsData[list._id] = {
            title: list.title,
            cards,
          };
        }

        setColumns(columnsData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleAddCard = async (listId) => {
    const description = prompt('Enter card description:');
    if (!description) return;

    try {
      const res = await createCard({ list: listId, description });
      const newCard = res.data?.data;

      setColumns(prev => ({
        ...prev,
        [listId]: {
          ...prev[listId],
          cards: [...prev[listId].cards, newCard],
        },
      }));
    } catch (err) {
      alert('Error adding card: ' + err.message);
    }
  };

  const handleDeleteCard = (cardId, listId) => {
    setColumns(prev => ({
      ...prev,
      [listId]: {
        ...prev[listId],
        cards: prev[listId].cards.filter(card => card._id !== cardId),
      },
    }));
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Kanban Board</h1>
      <div className="flex gap-4 overflow-x-auto">
        {Object.entries(columns).map(([listId, column]) => (
          <div key={listId} className="bg-gray-200 rounded-lg p-4 min-w-[300px]">
            <h2 className="text-xl font-semibold mb-4">{column.title}</h2>
            <div className="space-y-3">
              {column.cards.map((card) => (
                <Card
                  key={card._id}
                  card={card}
                  onDragStart={(e) => e.dataTransfer.setData('cardId', card._id)}
                  onDelete={(id) => handleDeleteCard(id, listId)}
                />
              ))}
            </div>
            <button
              onClick={() => handleAddCard(listId)}
              className="mt-4 w-full py-2 bg-gray-300 hover:bg-gray-400 rounded"
            >
              + Add Card
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
