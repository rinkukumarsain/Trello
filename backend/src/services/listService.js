const List = require('../models/list.model');
const Board = require('../models/board.model');
const Card = require('../models/card.model');
const { statusCode, resMessage } = require('../config/default.json'); 

// ========== Create List ==========
exports.createList = async (req) => {
  try {
    const { title, board, boardId, order } = req.body;
    const actualBoardId = board || boardId; // Support both field names

    if (!title || !actualBoardId) {
      return {
        statusCode: statusCode.BAD_REQUEST,
        success: false,
        message: "Title and board ID are required",
      };
    }

    const boardExists = await Board.findById(actualBoardId);
    if (!boardExists) {
      return {
        statusCode: statusCode.NOT_FOUND,
        success: false,
        message: "Board not found",
      };
    }

    const newList = new List({ title, board: actualBoardId, order: order || 0 });
    const savedList = await newList.save();

    boardExists.lists.push(savedList._id);
    await boardExists.save();

    return {
      statusCode: statusCode.CREATED,
      success: true,
      message: "List created successfully",
      data: savedList,
    };
  } catch (error) {
    return {
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message || "Internal Server Error",
    };
  }
};

// ========== View All Lists ==========
exports.viewList = async () => {
  try {
    const lists = await List.find().populate('cards');
    return {
      statusCode: statusCode.OK,
      success: true,
      message: "All lists fetched successfully",
      data: lists,
    };
  } catch (error) {
    return {
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    };
  }
};

// ========== View Lists by Board ==========
exports.viewBoard = async (req) => {
  try {
    const { boardId } = req.params;
    
    if (!boardId) {
      return {
        statusCode: statusCode.BAD_REQUEST,
        success: false,
        message: "Board ID is required",
      };
    }

    const lists = await List.find({ board: boardId }).populate('cards').sort({ order: 1 });
    
    return {
      statusCode: statusCode.OK,
      success: true,
      message: "Lists fetched successfully",
      data: lists,
    };
  } catch (error) {
    return {
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    };
  }
};

exports.getBoardWithLists = async (boardId) => {
  try {
    const board = await Board.findById(boardId).populate({
      path: 'lists',
      populate: { path: 'cards' },
    });

    if (!board) {
      return {
        statusCode: statusCode.NOT_FOUND,
        success: false,
        message: "Board not found",
      };
    }

    return {
      statusCode: statusCode.OK,
      success: true,
      message: "Board with lists fetched successfully",
      data: board,
    };
  } catch (error) {
    return {
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    };
  }
};

// ========== Update List ==========
exports.updateList = async (id, updatedFields) => {
  try {
    const updatedList = await List.findByIdAndUpdate(id, updatedFields, { new: true });

    if (!updatedList) {
      return {
        statusCode: 404,
        success: false,
        message: "List not found",
      };
    }

    return {
      statusCode: 200,
      success: true,
      message: "List updated successfully",
      data: updatedList,
    };
  } catch (error) {
    return {
      statusCode: 500,
      success: false,
      message: error.message,
    };
  }
};

// ========== Delete List ==========
exports.deleteList = async (id) => {
  try {
    const list = await List.findById(id);
    if (!list) {
      return {
        statusCode: statusCode.NOT_FOUND,
        success: false,
        message: "List not found",
      };
    }

    //  Delete cards by list reference, not list.cards array
    await Card.deleteMany({ list: list._id });

    // Remove list reference from its parent board
    await Board.findByIdAndUpdate(list.board, { $pull: { lists: list._id } });

    // Delete the list itself
    await List.findByIdAndDelete(id);

    return {
      statusCode: statusCode.OK,
      success: true,
      message: "List and its cards deleted successfully",
    };
  } catch (error) {
    return {
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    };
  }
};