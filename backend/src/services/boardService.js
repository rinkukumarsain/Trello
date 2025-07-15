// const Board = require('../models/board.model');
// const { statusCode } = require('../config/default.json');

// // Create Board
// exports.createBoard = async (req) => {
//   const { title, description, owner, members, lists } = req.body;

//   const newBoard = new Board({
//     title,
//     description,
//     owner,
//     members: members || [],
//     lists: lists || [],
//   });

//   await newBoard.save();

//   return {
//     statusCode: statusCode.OK,
//     success: true,
//     message: 'Board created successfully',
//     data: newBoard,
//   };
// };

// // View all boards (or based on user ID if needed)
// exports.viewBoard = async (req) => {
//   const userId = req.user?._id || req.query.userId;

//   const boards = await Board.find({
//     $or: [
//       { owner: userId },
//       { members: userId }
//     ]
//   }).populate('owner', 'first_name last_name email')
//     .populate('members', 'first_name last_name email')
//     .populate('lists');

//   return {
//     statusCode: statusCode.OK,
//     success: true,
//     message: 'Boards fetched successfully',
//     data: boards,
//   };
// };

// // Update Board
// exports.updateBoard = async (req) => {
//   const { boardId } = req.params;
//   const { title, description, members, lists } = req.body;

//   const updatedBoard = await Board.findByIdAndUpdate(
//     boardId,
//     {
//       ...(title && { title }),
//       ...(description && { description }),
//       ...(members && { members }),
//       ...(lists && { lists }),
//     },
//     { new: true }
//   ).populate('owner', 'first_name last_name email')
//    .populate('members', 'first_name last_name email')
//    .populate('lists');

//   if (!updatedBoard) {
//     throw new Error('Board not found');
//   }

//   return {
//     statusCode: statusCode.OK,
//     success: true,
//     message: 'Board updated successfully',
//     data: updatedBoard,
//   };
// };

// // Delete Board
// exports.deleteBoard = async (req) => {
//   const { boardId } = req.params;

//   const deleted = await Board.findByIdAndDelete(boardId);
//   if (!deleted) {
//     throw new Error('Board not found or already deleted');
//   }

//   return {
//     statusCode: statusCode.OK,
//     success: true,
//     message: 'Board deleted successfully',
//   };
// };
