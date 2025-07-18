// Card Model.js
const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    // Title of the task card
  },
  description: {
    type: String,
    trim: true,
    // Optional description of the task
  },
  list: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'List',
    required: true,
    // Which list this card belongs to
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    required: true,
    // Which board this card belongs to (redundant, but helps with querying)
  },
  order: {
    type: Number,
    default: 0,
    // Order of card within the list
  },
  assigned_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
    // User assigned to the card (optional)
  },
  attachment: {
    type: String,
    default: null,
    // Single attachment URL (can be expanded to array if needed)
  },

  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    // Who created the card
  }
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('Card', CardSchema);
