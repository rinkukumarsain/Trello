const Label = require('../models/label.model');
const mongoose = require('mongoose');
const { statusCode } = require('../config/default.json');

// Create a new label
exports.createLabel = async (req) => {
  try {
    const { name, color, board } = req.body;
    const created_by = req.auth?._id; // Accessing the user ID safely from auth

    if (!created_by) {
      return {
        statusCode: statusCode.UNAUTHORIZED,
        success: false,
        message: "Unauthorized: User not authenticated."
      };
    }

    if (!name || !color || !board) {
      return {
        statusCode: statusCode.BAD_REQUEST,
        success: false,
        message: "Name, color, and board are required."
      };
    }

    const label = await Label.create({ name, color, board, created_by });

    return {
      statusCode: statusCode.SUCCESS,
      success: true,
      message: "Label created successfully",
      data: label
    };
  } catch (error) {
    return {
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message
    };
  }
};


// Get labels by board ID using aggregation
exports.getLabelByBoard = async (req) => {
  try {
    const { boardId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(boardId)) {
      return {
        statusCode: statusCode.BAD_REQUEST,
        success: false,
        message: "Invalid board ID"
      };
    }

    const labels = await Label.aggregate([
      { $match: { board: new mongoose.Types.ObjectId(boardId) } },
      {
        $lookup: {
          from: 'boards',
          localField: 'board',
          foreignField: '_id',
          as: 'boardInfo'
        }
      },
      { $unwind: '$boardInfo' },
      {
        $lookup: {
          from: 'users',
          localField: 'created_by',
          foreignField: '_id',
          as: 'creatorInfo'
        }
      },
      { $unwind: '$creatorInfo' },
      {
        $project: {
          name: 1,
          color: 1,
          createdAt: 1,
          updatedAt: 1,
          board: '$boardInfo.title',
          created_by: {
            _id: '$creatorInfo._id',
            name: { $concat: ['$creatorInfo.first_name', ' ', '$creatorInfo.last_name'] },
            email: '$creatorInfo.email'
          }
        }
      }
    ]);

    return {
      statusCode: statusCode.SUCCESS,
      success: true,
      message: "Labels fetched successfully",
      data: labels
    };
  } catch (error) {
    return {
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message
    };
  }
};

// Update a label
exports.updateLabel = async (req) => {
  try {
    const { id } = req.params;
    const { name, color } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        statusCode: statusCode.BAD_REQUEST,
        success: false,
        message: "Invalid label ID"
      };
    }

    const label = await Label.findByIdAndUpdate(
      id,
      { name, color },
      { new: true }
    );

    if (!label) {
      return {
        statusCode: statusCode.NOT_FOUND,
        success: false,
        message: "Label not found"
      };
    }

    return {
      statusCode: statusCode.SUCCESS,
      success: true,
      message: "Label updated successfully",
      data: label
    };
  } catch (error) {
    return {
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message
    };
  }
};

// Delete a label
exports.deleteLabel = async (req) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        statusCode: statusCode.BAD_REQUEST,
        success: false,
        message: "Invalid label ID"
      };
    }

    const label = await Label.findByIdAndDelete(id);

    if (!label) {
      return {
        statusCode: statusCode.NOT_FOUND,
        success: false,
        message: "Label not found"
      };
    }

    return {
      statusCode: statusCode.SUCCESS,
      success: true,
      message: "Label deleted successfully"
    };
  } catch (error) {
    return {
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message
    };
  }
};
