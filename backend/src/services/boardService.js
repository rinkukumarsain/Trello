const Board = require('../models/board.model');
const User = require('../models/user.model');

// ===== Create Board =====
exports.createBoard = async (user, body) => {
  try {
    if (!user || (user.role !== 'admin' && user.role !== 'member')) {
      return {
        success: false,
        message: 'Access denied. Only admin and member roles can create boards',
      };
    }

    const { title, members = [], lists = [] } = body;

    if (!title.trim()) {
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

    // Add board to creator's boards list
    await User.findByIdAndUpdate(user._id, {
      $addToSet: { boards: savedBoard._id },
    });

    // Add board to members' boards list too
    if (members.length > 0) {
      await User.updateMany(
        { _id: { $in: members } },
        { $addToSet: { boards: savedBoard._id } }
      );
    }

    const populatedBoard = await Board.findById(savedBoard._id)
      .populate('owner', 'first_name last_name email')
      .populate('members', 'first_name last_name email')
      .populate({
        path: 'lists',
        populate: {
          path: 'cards',
          select: 'title description',
        },
      });

    return {
      success: true,
      message: 'Board created successfully',
      data: populatedBoard,
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

// ===== Get Board By ID =====
exports.getBoardById = async (req) => {
  try {
    const { id } = req.params;
    const userId = req.auth?._id;

    if (!userId) {
      return {
        success: false,
        message: 'Unauthorized access',
      };
    }

    const board = await Board.findOne({
      _id: id,
      $or: [
        { owner: userId },
        { members: userId }
      ]
    })
      .populate('owner', 'first_name last_name email')
      .populate('members', 'first_name last_name email')
      .populate({
        path: 'lists',
        populate: {
          path: 'cards',
          select: 'title description',
        },
      });

    if (!board) {
      return {
        success: false,
        message: 'Board not found or access denied',
      };
    }

    return {
      success: true,
      message: 'Board fetched successfully',
      data: board,
    };
  } catch (error) {
    console.error('Error fetching board:', error.message);
    return {
      success: false,
      message: 'Error fetching board',
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
  try {
    const { id } = req.params;
    const { title, members, lists } = req.body;

    const updatedBoard = await Board.findByIdAndUpdate(
      id,
      {
        ...(title && { title }),
        ...(members && { members }),
        ...(lists && { lists }),
      },
      { new: true }
    )
      .populate('owner', 'first_name last_name email')
      .populate('members', 'first_name last_name email')
      .populate('lists');

    if (!updatedBoard) {
      return {
        success: false,
        message: 'Board not found',
      };
    }

    return {
      success: true,
      message: 'Board updated successfully',
      data: updatedBoard,
    };
  } catch (error) {
    console.error('Update Board Error:', error);
    return {
      success: false,
      message: 'Internal server error',
      error: error.message,
    };
  }
};


// ===== Delete Board =====
exports.deleteBoard = async (req) => {
  const { id } = req.params;

  const deleted = await Board.findByIdAndDelete(id);
  if (!deleted) {
    throw new Error('Board not found or already deleted');
  }

  return {
    success: true,
    message: 'Board deleted successfully',
  };
};
