//  Board Model.js

const mongoose = require('mongoose');
const BoardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    // Board title (e.g., "Sprint Planning")
  },
  description: {
    type: String,
    default: '',
    trim: true,
    // Optional board description
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    // The user who created this board
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      // Users who are part of this board
    }
  ],
  lists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'List',
      // List columns (e.g., To Do, In Progress)
    }
  ],
  created_at: {
    type: Date,
    default: Date.now,
    // Timestamp when board was created
  }
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('Board', BoardSchema);
