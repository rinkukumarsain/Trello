import React, { useState } from 'react';
import {
  Rocket,
  Zap,
  Filter,
  Star,
  Users,
  MoreHorizontal,
  X
} from 'lucide-react';
import { createMember, deleteMember, createMail } from '../lib/api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BoardNavbar = ({ board }) => {
  const [showAddMember, setShowAddMember] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null); // New: track member being deleted

  if (!board) return null;

  const handleAddMember = async () => {
    const trimmedEmail = email.trim().toLowerCase();

    if (!trimmedEmail) {
      toast.error('Please enter an email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      setLoading(true);
      const response = await createMember(board._id, { email: trimmedEmail });

      if (response.data.success) {
        toast.success(response.data.message || 'Member added successfully!');
        setEmail('');
        setShowAddMember(false);

        try {
          await createMail(
            trimmedEmail,
            `You've been added to the board "${board.title}"`,
            `Hi there! You've been added to the board "${board.title}". Please log in to check your access.`
          );
        } catch (emailErr) {
          console.error('Email failed:', emailErr);
          toast.warn('Member added, but failed to send email');
        }

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast.error(response.data.message || 'Failed to add member');
      }
    } catch (err) {
      const status = err.response?.status;
      if (status === 404) {
        toast.error('User with this email does not exist in our database');
      } else if (status === 400) {
        toast.error(err.response?.data?.message || 'User is already a member or invalid request');
      } else if (status === 403) {
        toast.error('You do not have permission to add members to this board');
      } else {
        toast.error('Failed to add member. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMember = async (member) => {
    const confirmDelete = window.confirm(
      `Remove ${member.first_name} ${member.last_name} from the board?`
    );
    if (!confirmDelete) return;

    try {
      setDeletingId(member._id);
      await deleteMember(board._id, member._id);
      toast.success(`${member.first_name} removed successfully!`);
      window.location.reload();
    } catch (err) {
      console.error('Delete member error:', err);
      toast.error(err?.response?.data?.message || 'Failed to remove member');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="w-full px-4 py-3 bg-gray-700 text-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3 font-semibold text-sm">
          <span className="capitalize text-gray-200 text-lg">{board.title}</span>
        </div>

        <div className="flex items-center gap-4 relative">
          <div className="flex items-center gap-1">
            {board.owner && (
              <div
                title={`${board.owner.first_name} ${board.owner.last_name} (Owner)`}
                className="bg-red-600 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold uppercase"
              >
                {(board.owner.first_name?.[0] || '') + (board.owner.last_name?.[0] || '')}
              </div>
            )}

            {board.members?.map((member) => (
              <div
                key={member._id}
                title={`Click to remove ${member.first_name} ${member.last_name}`}
                className={`bg-blue-600 w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold uppercase cursor-pointer hover:bg-blue-800 ${
                  deletingId === member._id ? 'opacity-50 pointer-events-none' : ''
                }`}
                onClick={() => handleDeleteMember(member)}
              >
                {(member.first_name?.[0] || '') + (member.last_name?.[0] || '')}
              </div>
            ))}
          </div>

          {/* Icons */}
          <Rocket size={16} className="cursor-pointer hover:opacity-80" />
          <Zap size={16} className="cursor-pointer hover:opacity-80" />
          <Filter size={16} className="cursor-pointer hover:opacity-80" />
          <Star size={16} className="cursor-pointer hover:opacity-80" />

          {/* Add Member Button */}
          <div className="relative">
            <Users
              size={16}
              className="cursor-pointer hover:opacity-80"
              onClick={() => setShowAddMember(!showAddMember)}
            />

            {showAddMember && (
              <div className="absolute right-0 top-8 w-64 p-4 bg-white text-black rounded shadow-lg z-50">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-base">Add Member</h3>
                  <X
                    size={18}
                    className="cursor-pointer text-red-600 hover:text-red-400"
                    onClick={() => {
                      setShowAddMember(false);
                      setEmail('');
                    }}
                  />
                </div>

                <input
                  type="email"
                  placeholder="Enter user's email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddMember();
                    if (e.key === 'Escape') {
                      setShowAddMember(false);
                      setEmail('');
                    }
                  }}
                  className="w-full mb-2 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                  disabled={loading}
                />
                <button
                  onClick={handleAddMember}
                  disabled={loading}
                  className="bg-blue-600 text-white w-full py-1 text-sm rounded hover:bg-blue-700"
                >
                  {loading ? 'Adding...' : 'Add Member'}
                </button>
              </div>
            )}
          </div>

          <button className="bg-gray-200 text-black text-xs px-3 py-1 rounded hover:bg-gray-300">
            Share
          </button>
          <MoreHorizontal size={16} className="cursor-pointer hover:opacity-80" />
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default BoardNavbar;
