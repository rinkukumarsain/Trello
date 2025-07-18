const Board = require('../models/board.model');
const User = require('../models/user.model');

// ===== Create Board =====
exports.createBoard = async (user, body) => {
  try {
    if (!user || user.role !== 'admin') {
      return {
        success: false,
        message: 'Only admins can create boards',
      };
    }
    const { title, members, lists } = body;
    if (!title) {
      return {
        success: false,
        message: 'Title is required',
      };
    }
    const newBoard = new Board({
      title,
      owner: user._id,
      members,
      lists,
    });

    const savedBoard = await newBoard.save();

    return {
      success: true,
      message: 'Board created successfully',
      data: savedBoard,
    };
  } catch (error) {
    console.error('Service Error - createBoard:', error.message);
    return {
      success: false,
      message: 'Internal server error',
      error: error.message,
    };
  }
};

// ===== View Boards =====
exports.viewBoard = async (req) => {
  try {
    const userId = req.auth?._id;
    if (!userId) {
      return {
        success: false,
        message: 'Unauthorized access',
      };
    }

    const boards = await Board.aggregate([
      {
        $match: {
          $or: [
            { owner: userId },
            { members: userId }
          ]
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'owner',
          foreignField: '_id',
          as: 'owner'
        }
      },
      { $unwind: '$owner' },
      {
        $lookup: {
          from: 'users',
          localField: 'members',
          foreignField: '_id',
          as: 'members'
        }
      },
      {
        $project: {
          'owner.password': 0,
          'owner.__v': 0,
          'members.password': 0,
          'members.__v': 0,
        }
      }
    ]);

    return {
      success: true,
      message: 'Boards fetched successfully',
      data: boards,
    };
  } catch (error) {
    console.error('Error fetching boards:', error.message);
    return {
      success: false,
      message: 'Error fetching boards',
      error: error.message,
    };
  }
};

// ===== Update Board =====
exports.updateBoard = async (req) => {
  const { boardId } = req.params;
  const { title, members, lists } = req.body;

  const updatedBoard = await Board.findByIdAndUpdate(
    boardId,
    {
      ...(title && { title }),
      ...(members && { members }),
      ...(lists && { lists }),
    },
    { new: true }
  ).populate('owner', 'first_name last_name email')
   .populate('members', 'first_name last_name email')
   .populate('lists');

  if (!updatedBoard) {
    throw new Error('Board not found');
  }

  return {
    success: true,
    message: 'Board updated successfully',
    data: updatedBoard,
  };
};

// ===== Delete Board =====
exports.deleteBoard = async (req) => {
  const { boardId } = req.params;

  const deleted = await Board.findByIdAndDelete(boardId);
  if (!deleted) {
    throw new Error('Board not found or already deleted');
  }

  return {
    success: true,
    message: 'Board deleted successfully',
  };
};
