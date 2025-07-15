const Board = require('../models/board.model');
const { statusCode,resMessage } = require('../config/default.json');
const User = require('../models/user.model');
// Create Board
exports.createBoard = async (req) => {
  try {
    const user = req.auth;
    console.log('Authenticated User:', user);

    // Check admin role
    if (!user || user.role !== 'admin') {
      console.log('Access denied: User is not admin');
      return {
        statusCode: statusCode.ACCESS_DENIED,
        success: false,
        message: resMessage.ACCESS_DENIED || 'Only admins can create boards',
      };
    }

    const { title, description, members = [], lists = [] } = req.body;
    console.log('Request Body:', req.body);

    // Validate member IDs
    const validUsers = await User.find({ _id: { $in: members } }, '_id');
    const validMemberIds = validUsers.map(u => u._id);
    console.log('Valid Member IDs:', validMemberIds);

    // Save new board
    const newBoard = new Board({
      title,
      description,
      owner: user._id,
      members: validMemberIds,
      lists,
    });

    await newBoard.save();
    console.log('New Board Saved:', newBoard);

    //  Push board ID to owner & members
    await User.updateMany(
      { _id: { $in: [...validMemberIds, user._id] } },
      { $addToSet: { board: newBoard._id } }
    );
    console.log('Board ID added to users');

    //  Populate owner and members using aggregation
    const boardWithUsers = await Board.aggregate([
      { $match: { _id: newBoard._id } },

      // Lookup owner
      {
        $lookup: {
          from: 'users',
          localField: 'owner',
          foreignField: '_id',
          as: 'owner'
        }
      },
      { $unwind: '$owner' }, // flatten owner array

      // Lookup members
      {
        $lookup: {
          from: 'users',
          localField: 'members',
          foreignField: '_id',
          as: 'members'
        }
      },

      // Optional: hide password and __v
      {
        $project: {
          'owner.password': 0,
          'members.password': 0,
          'owner.__v': 0,
          'members.__v': 0
        }
      }
    ]);

    console.log('Aggregated Board with Users:', boardWithUsers[0]);

    return {
      statusCode: statusCode.OK,
      success: true,
      message: 'Board created successfully',
      data: boardWithUsers[0] || {},
    };

  } catch (error) {
    console.error('Error creating board:', error.message);
    return {
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: resMessage.INTERNAL_SERVER_ERROR || 'Board creation failed',
      error: error.message,
    };
  }
};


// View all boards (or based on user ID if needed)
exports.viewBoard = async (req) => {
  try {
    const userId = req.user?._id || req.query.userId;

    if (!userId) {
      return {
        statusCode: 400,
        success: false,
        message: 'User ID is required to view boards',
      };
    }

    const objectId = new mongoose.Types.ObjectId(userId);

    const boards = await Board.aggregate([
      {
        $match: {
          $or: [
            { owner: objectId },
            { members: objectId }
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
      {
        $unwind: '$owner'
      },
      {
        $lookup: {
          from: 'users',
          localField: 'members',
          foreignField: '_id',
          as: 'members'
        }
      },
      {
        $lookup: {
          from: 'lists',
          localField: 'lists',
          foreignField: '_id',
          as: 'lists'
        }
      },
      {
        $project: {
          title: 1,
          description: 1,
          owner: {
            _id: 1,
            first_name: '$owner.first_name',
            last_name: '$owner.last_name',
            email: '$owner.email'
          },
          members: {
            $map: {
              input: '$members',
              as: 'member',
              in: {
                _id: '$$member._id',
                first_name: '$$member.first_name',
                last_name: '$$member.last_name',
                email: '$$member.email'
              }
            }
          },
          lists: 1,
          createdAt: 1,
          updatedAt: 1
        }
      }
    ]);

    return {
      statusCode: statusCode.OK,
      success: true,
      message: 'Boards fetched successfully using aggregation pipeline',
      data: boards,
    };

  } catch (error) {
    console.error('Error fetching boards:', error.message);
    return {
      statusCode: statusCode.INTERNAL_SERVER_ERROR || 500,
      success: false,
      message: 'Failed to fetch boards',
      error: error.message,
    };
  }
};



// Update Board
exports.updateBoard = async (req) => {
  const { boardId } = req.params;
  const { title, description, members, lists } = req.body;

  const updatedBoard = await Board.findByIdAndUpdate(
    boardId,
    {
      ...(title && { title }),
      ...(description && { description }),
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
    statusCode: statusCode.OK,
    success: true,
    message: 'Board updated successfully',
    data: updatedBoard,
  };
};

// Delete Board
exports.deleteBoard = async (req) => {
  const { boardId } = req.params;

  const deleted = await Board.findByIdAndDelete(boardId);
  if (!deleted) {
    throw new Error('Board not found or already deleted');
  }

  return {
    statusCode: statusCode.OK,
    success: true,
    message: 'Board deleted successfully',
  };
};
