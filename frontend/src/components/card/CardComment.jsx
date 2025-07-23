import React, { useState } from "react";
import { commentCard } from "../lib/api";

const CardCommentsSection = ({ card, comments, setComments }) => {
  const [comment, setComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  const handleSaveComment = async () => {
    if (!comment.trim()) return;

    try {
      setCommentLoading(true);
      const response = await commentCard(card._id, { text: comment });
      if (response.data.success) {
        setComments(response.data.data.comments);
        setComment("");
      }
    } catch (err) {
      console.error("Error saving comment", err);
    } finally {
      setCommentLoading(false);
    }
  };

  const handleCancelComment = () => {
    setComment("");
  };

  return (
    <>
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-semibold">Comments and activity</h3>
        <button className="text-sm text-blue-400 hover:underline">
          Show/Hide Details
        </button>
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write a comment..."
        className="w-full bg-gray-700 text-white p-3 rounded-md outline-none resize-none min-h-[80px]"
      />
      <div className="flex gap-2 mt-3">
        <button
          onClick={handleSaveComment}
          disabled={commentLoading || !comment.trim()}
          className="h-10 rounded p-2 bg-blue-400 text-black hover:bg-blue-300 disabled:opacity-50"
        >
          {commentLoading ? "Saving..." : "Save"}
        </button>
        {comment && (
          <button
            onClick={handleCancelComment}
            className="h-10 rounded p-2 bg-gray-600 text-white hover:bg-red-400"
          >
            Cancel
          </button>
        )}
      </div>
      <div className="mt-6 space-y-4 max-h-[300px] overflow-y-auto pr-1">
        {comments.length === 0 ? (
          <p className="text-sm text-gray-400">No comments yet.</p>
        ) : (
          comments.map((c, index) => (
            <div key={index} className="bg-gray-700 p-3 rounded-md text-sm text-white">
              <p>{c.text}</p>
              <span className="text-xs text-gray-400 block mt-1">
                {new Date(c.created_at).toLocaleString()}
              </span>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default CardCommentsSection;
