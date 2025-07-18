const Card = require('../models/card.model');
const mongoose = require('mongoose');
const { statusCode } = require('../config/default.json');

// Create Card
exports.createCard = async (req) => {
  try {
    const { title, description, list, board, assigned_to, attachment } = req.body;
    const user = req.auth;
    // Basic validation
    if (!title || !list || !board) {
      return {
        success: false,
        message: 'Title, list, and board are required fields.',
      };
    }
    const newCard = new Card({
      title,
      description,
      list,
      board,
      assigned_to,
      attachment,
      created_by: user._id,
    });

    const savedCard = await newCard.save();
    return {
      success: true,
      message: 'Card created successfully',
      data: savedCard,
    };
  } catch (error) {
    console.error('Service Error - createCard:', error.message);
    return {
      success: false,
      message: 'Internal server error',
      error: error.message,
    };
  }
};

// View Cards (all or by boardId)
exports.viewCard = async (req) => {
  try {
    const { boardId } = req.query;

    const matchStage = {};
    if (boardId) {
      if (!mongoose.Types.ObjectId.isValid(boardId)) {
        return {
          statusCode: statusCode.BAD_REQUEST,
          success: false,
          message: "Invalid board ID"
        };
      }
      matchStage.board = new mongoose.Types.ObjectId(boardId);
    }

    const cards = await Card.aggregate([
      { $match: matchStage },
      {
        $lookup: {
          from: 'lists',
          localField: 'list',
          foreignField: '_id',
          as: 'list'
        }
      },
      { $unwind: '$list' },
      {
        $lookup: {
          from: 'boards',
          localField: 'board',
          foreignField: '_id',
          as: 'board'
        }
      },
      { $unwind: '$board' },
      {
        $lookup: {
          from: 'users',
          localField: 'assigned_to',
          foreignField: '_id',
          as: 'assigned_to'
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'created_by',
          foreignField: '_id',
          as: 'created_by'
        }
      },
      { $unwind: '$created_by' },
      {
        $project: {
          title: 1,
          description: 1,
          order: 1,
          attachment: 1,
          created_at: 1,
          updated_at: 1,
          list: '$list.title',
          board: '$board.title',
          assigned_to: {
            $cond: {
              if: { $gt: [{ $size: '$assigned_to' }, 0] },
              then: { $arrayElemAt: ['$assigned_to', 0] },
              else: null
            }
          },
          created_by: {
            _id: '$created_by._id',
            name: { $concat: ['$created_by.first_name', ' ', '$created_by.last_name'] },
            email: '$created_by.email'
          },
          comment: 1
        }
      }
    ]);

    return {
      statusCode: statusCode.SUCCESS,
      success: true,
      message: "Cards fetched successfully",
      data: cards
    };

  } catch (error) {
    return {
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message
    };
  }
};

// Update Card
exports.updateCard = async (req) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const card = await Card.findByIdAndUpdate(id, updateData, { new: true });

    if (!card) {
      return {
        statusCode: statusCode.NOT_FOUND,
        success: false,
        message: "Card not found"
      };
    }

    return {
      statusCode: statusCode.SUCCESS,
      success: true,
      message: "Card updated successfully",
      data: card
    };

  } catch (error) {
    return {
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message
    };
  }
};

// Delete Card
exports.deleteCard = async (req) => {
  try {
    const { id } = req.params;

    const card = await Card.findByIdAndDelete(id);

    if (!card) {
      return {
        statusCode: statusCode.NOT_FOUND,
        success: false,
        message: "Card not found"
      };
    }

    return {
      statusCode: statusCode.SUCCESS,
      success: true,
      message: "Card deleted successfully"
    };

  } catch (error) {
    return {
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message
    };
  }
};
