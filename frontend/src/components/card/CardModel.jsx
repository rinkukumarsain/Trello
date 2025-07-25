import React, { useState, useEffect } from "react";
import {
  X,
  ChevronDown,
  UserPlus,
  CalendarDays,
  Tag,
  ListChecks,
} from "lucide-react";
import CardDescriptionSection from "./CardDescription";
import CardCommentsSection from "./CardComment";
import { fetchComments } from "../lib/api";

const CardModel = ({ listName = "Completed", card, onClose }) => {
  const [description, setDescription] = useState(card?.description || "");
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(true);

  // Fetch comments when modal opens
  useEffect(() => {
    const getComments = async () => {
      if (card?._id) {
        try {
       
          const response = await fetchComments(card._id);
          if (response.data.success) {
            setComments(response.data.data || []);
          }
        } catch (error) {
          console.error('Error fetching comments:', error);
          setComments([]);
        } finally {
          setLoadingComments(false);
        }
      }
    };

    getComments();
  }, [card?._id]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 text-white w-[900px] rounded-xl shadow-lg flex relative">
        {/* Left Side */}
        <div className="w-2/3 p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-gray-700 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <ChevronDown size={16} />
              {listName}
            </span>
          </div>

          <h2 className="text-2xl font-semibold mb-2">{card?.title}</h2>

          <div className="flex flex-wrap gap-2 mb-4">
            <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md text-sm flex items-center gap-1">
              <Tag size={14} /> Labels
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md text-sm flex items-center gap-1">
              <CalendarDays size={14} /> Dates
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md text-sm flex items-center gap-1">
              <ListChecks size={14} /> Checklist
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md text-sm flex items-center gap-1">
              <UserPlus size={14} /> Members
            </button>
          </div>

          <CardDescriptionSection
            card={card}
            description={description}
            setDescription={setDescription}
          />
        </div>

        {/* Right Side */}
        <div className="w-1/3 border-l border-gray-600 p-6">
          {loadingComments ? (
            <div className="text-center text-gray-400">Loading comments...</div>
          ) : (
            <CardCommentsSection
              card={card}
              comments={comments}
              setComments={setComments}
            />
          )}
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-red-500"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};

export default CardModel;
