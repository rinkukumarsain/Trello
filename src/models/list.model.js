// list model.js

const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true
    },
   board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Board',
    // Reference to the parent Board
  },
  cards: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Card'
      // Array of card references contained in this list
    }
  ],
  order: {
    type: Number,
    default: 0,
    // Position of the list in the board (for ordering)
  },
  created_at: {
    type: Date,
    default: Date.now,
    // Automatically set the creation date
  }
},
{
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('List', listSchema);