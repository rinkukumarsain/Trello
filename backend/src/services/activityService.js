const mongoose = require('mongoose');
const Activity = require('../models/activity.model');
const { statusCode } = require('../config/default.json');

// Create Activity Service
exports.createActivity = async (req) => {
  try {
    const { board, action, card } = req.body;
    const user = req.auth?._id;

    // Validate required fields
    if (!user || !board || !action) {
      return {
        statusCode: statusCode.BAD_REQUEST,
        success: false,
        message: "User, board, and action are required."
      };
    }

    // Create activity
    const activity = await Activity.create({
      board,
      user,
      action,
      card: card || null
    });

    return {
      statusCode: statusCode.SUCCESS,
      success: true,
      message: "Activity created successfully",
      data: activity
    };
  } catch (error) {
    return {
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message
    };
  }
};

// View Activity Service (by Board ID)
exports.viewActivity = async (req) => {
  try {
    const { boardId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(boardId)) {
      return {
        statusCode: statusCode.BAD_REQUEST,
        success: false,
        message: "Invalid board ID"
      };
    }

    const activities = await Activity.aggregate([
      { $match: { board: new mongoose.Types.ObjectId(boardId) } },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'userInfo'
        }
      },
      { $unwind: '$userInfo' },
      {
        $lookup: {
          from: 'cards',
          localField: 'card',
          foreignField: '_id',
          as: 'cardInfo'
        }
      },
      {
        $project: {
          _id: 1,
          action: 1,
          board: 1,
          createdAt: 1,
          user: {
            _id: '$userInfo._id',
            name: { $concat: ['$userInfo.first_name', ' ', '$userInfo.last_name'] },
            email: '$userInfo.email'
          },
          card: {
            $cond: {
              if: { $gt: [{ $size: '$cardInfo' }, 0] },
              then: { $arrayElemAt: ['$cardInfo.title', 0] },
              else: null
            }
          }
        }
      },
      { $sort: { createdAt: -1 } }
    ]);

    return {
      statusCode: statusCode.SUCCESS,
      success: true,
      message: "Activities fetched successfully",
      data: activities
    };
  } catch (error) {
    return {
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message
    };
  }
};
