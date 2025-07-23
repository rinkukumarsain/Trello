import React, { useState } from "react";
import { Pencil, Trash, Plus } from "lucide-react";
import { updateCard } from "../lib/api";

const CardDescription = ({ card, description, setDescription }) => {
  const [tempDescription, setTempDescription] = useState(description || "");
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(!description);

  const handleSaveDescription = async () => {
    try {
      setLoading(true);
      const response = await updateCard(card._id, { description: tempDescription });
      if (response.data.success) {
        setDescription(tempDescription);
        setIsEditing(false);
        setIsAdding(false);
      }
    } catch (error) {
      console.error("Failed to save description", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setTempDescription(description);
    setIsEditing(false);
    setIsAdding(false);
  };

  const handleDeleteDescription = async () => {
    try {
      setLoading(true);
      const response = await updateCard(card._id, { description: "" });
      if (response.data.success) {
        setDescription("");
        setTempDescription("");
        setIsEditing(false);
        setIsAdding(true);
      }
    } catch (err) {
      console.error("Error clearing description", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-semibold">Description</h3>
        {!isEditing && !isAdding && description && (
          <div className="flex gap-2">
            <button
              className="text-xs flex items-center gap-1 hover:text-yellow-400"
              onClick={() => setIsEditing(true)}
            >
              <Pencil size={14} /> Edit
            </button>
            <button
              className="text-xs flex items-center gap-1 text-red-400 hover:text-red-500"
              onClick={handleDeleteDescription}
            >
              <Trash size={14} /> Delete
            </button>
          </div>
        )}
      </div>

      {!isEditing && !isAdding ? (
        <p className="bg-gray-700 text-white p-3 rounded-md min-h-[60px]">
          {description || "No description added."}
        </p>
      ) : (
        <>
          <textarea
            value={tempDescription}
            onChange={(e) => setTempDescription(e.target.value)}
            placeholder="Add a more detailed description..."
            className="w-full bg-gray-700 text-white p-3 rounded-md outline-none resize-none min-h-[100px]"
          />
          <div className="flex gap-2 mt-3">
            <button
              onClick={handleSaveDescription}
              disabled={loading}
              className="h-10 rounded p-2 bg-blue-400 text-black hover:bg-blue-300 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleCancelEdit}
              className="h-10 rounded p-2 bg-gray-600 text-white hover:bg-red-400"
            >
              Cancel
            </button>
          </div>
        </>
      )}

      {!description && !isEditing && !isAdding && (
        <button
          className="mt-3 text-sm text-blue-400 hover:underline flex items-center gap-1"
          onClick={() => setIsAdding(true)}
        >
          <Plus size={16} /> Add a description
        </button>
      )}
    </div>
  );
};

export default CardDescription;
