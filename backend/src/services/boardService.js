const Board = require('../models/board.model');
const User = require('../models/user.model');
const List = require('../models/list.model');
const Card = require('../models/card.model');
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
  try {
    const { id } = req.params;

    // Check if board exists
    const board = await Board.findById(id);
    if (!board) {
      return {
        success: false,
        message: 'Board not found or already deleted',
      };
    }

    //  Find all lists associated with this board
    const lists = await List.find({ board: id });
    const listIds = lists.map((list) => list._id);

    //  Delete all cards under those lists (by list reference)
    await Card.deleteMany({ list: { $in: listIds } });

    //  Also delete all cards directly associated with this board
    await Card.deleteMany({ board: id });

    //  Delete all lists under this board
    await List.deleteMany({ board: id });

    //  Remove board from users' `boards` array
    const userIdsToUpdate = [board.owner, ...(board.members || [])];
    await User.updateMany(
      { _id: { $in: userIdsToUpdate } },
      { $pull: { boards: board._id } }
    );

    //  Delete the board itself
    await Board.findByIdAndDelete(id);

    return {
      success: true,
      message: 'Board, its lists, and cards deleted successfully',
    };
  } catch (error) {
    console.error('Delete Board Error:', error);
    return {
      success: false,
      message: 'Internal server error',
      error: error.message,
    };
  }
};


exports.createMember = async (req) => {
  try {
    const { id } = req.params; // board ID
    const { email } = req.body;
    const currentUserId = req.auth?._id;

    // Validate email
    if (!email) {
      return {
        success: false,
        message: 'Email is required',
      };
    }

    // Check if board exists and user has access
    const board = await Board.findOne({
      _id: id,
      $or: [{ owner: currentUserId }, { members: currentUserId }]
    });

    if (!board) {
      return {
        success: false,
        message: 'Board not found or access denied',
      };
    }

    // Find user by email
    const userToAdd = await User.findOne({ email: email.toLowerCase() });

    if (!userToAdd) {
      return {
        success: false,
        message: 'User with this email not found',
      };
    }

    // Check if user is already the owner
    if (board.owner.toString() === userToAdd._id.toString()) {
      return {
        success: false,
        message: 'User is already the owner of this board',
      };
    }

    // Check if user is already a member
    if (board.members.includes(userToAdd._id)) {
      return {
        success: false,
        message: 'User is already a member of this board',
      };
    }

    // Add user to board members
    board.members.push(userToAdd._id);
    await board.save();

    // Add board to user's boards list
    await User.findByIdAndUpdate(userToAdd._id, {
      $addToSet: { boards: board._id }
    });

    // Return updated board with populated members
    const updatedBoard = await Board.findById(id)
      .populate('owner', 'first_name last_name email')
      .populate('members', 'first_name last_name email');

    return {
      success: true,
      message: `${userToAdd.first_name} ${userToAdd.last_name} added to board successfully`,
      data: updatedBoard,
    };
  } catch (error) {
    console.error('Add Member Error:', error);
    return {
      success: false,
      message: 'Internal server error',
      error: error.message,
    };
  }
};

// ===== Remove Member from Board =====
exports.deleteMember = async (req) => {
  try {
    const { id, memberId } = req.params; // board ID and member ID
    const currentUserId = req.auth?._id;

    // Check if board exists and user has permission (only owner can remove members)
    const board = await Board.findOne({
      _id: id,
      owner: currentUserId
    });

    if (!board) {
      return {
        success: false,
        message: 'Board not found or only board owner can remove members',
      };
    }

    // Check if the member exists in the board
    if (!board.members.includes(memberId)) {
      return {
        success: false,
        message: 'User is not a member of this board',
      };
    }

    // Remove user from board members
    board.members = board.members.filter(member => member.toString() !== memberId);
    await board.save();

    // Remove board from user's boards list
    await User.findByIdAndUpdate(memberId, {
      $pull: { boards: board._id }
    });

    // Return updated board with populated members
    const updatedBoard = await Board.findById(id)
      .populate('owner', 'first_name last_name email')
      .populate('members', 'first_name last_name email');

    return {
      success: true,
      message: 'Member removed from board successfully',
      data: updatedBoard,
    };
  } catch (error) {
    console.error('Remove Member Error:', error);
    return {
      success: false,
      message: 'Internal server error',
      error: error.message,
    };
  }
};

// ===== Get Board Members =====
exports.viewMember = async (req) => {
  try {
    const { id } = req.params;
    const currentUserId = req.auth?._id;

    // Check if board exists and user has access
    const board = await Board.findOne({
      _id: id,
      $or: [
        { owner: currentUserId },
        { members: currentUserId }
      ]
    })
    .populate('owner', 'first_name last_name email profile_image')
    .populate('members', 'first_name last_name email profile_image');

    if (!board) {
      return {
        success: false,
        message: 'Board not found or access denied',
      };
    }

    const allMembers = [
      { ...board.owner.toObject(), role: 'owner' },
      ...board.members.map(member => ({ ...member.toObject(), role: 'member' }))
    ];

    return {
      success: true,
      message: 'Board members fetched successfully',
      data: {
        boardTitle: board.title,
        members: allMembers,
        totalMembers: allMembers.length
      },
    };
  } catch (error) {
    console.error('Get Board Members Error:', error);
    return {
      success: false,
      message: 'Internal server error',
      error: error.message,
    };
  }
};
