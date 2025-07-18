const services = require("../services/boardService");
const { statusCode } = require('../config/default.json');

exports.viewBoard = async (req, res) => {
  try {
    const result = await services.viewBoard(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};

exports.createBoard = async (req, res) => {
  try {
    const user = req.auth; // Pass the authenticated user
    const body = req.body;
    const result = await services.createBoard(user, body);
    res.status(result.success ? 201 : 403).json(result);
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};

exports.updateBoard = async (req, res) => {
  try {
    const result = await services.updateBoard(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};

exports.deleteBoard = async (req, res) => {
  try {
    const result = await services.deleteBoard(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};
