const mongoose = require("mongoose");


const labelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,

  },
  color: {
    type: String,
    required: true,
    trim: true,
    // Hex code or valid CSS color
  },
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
    required: true,
    // The board to which this label belongs
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    // The user who created this label
  }
}, {
  timestamps: true,
  // Automatically adds createdAt and updatedAt fields
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model("Label", labelSchema);
