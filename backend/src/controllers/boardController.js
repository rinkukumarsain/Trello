const services = require('../services/boardService');
const { statusCode } = require('../../config/default.json');

exports.viewBoard = async (req, res) => {
  try {
    const result = await services.viewBoard(req);
    res.status(200).json(result);
  } catch (error) {
   return({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};

exports.allBoard = async (req, res) => {
  try {
    const result = await services.allBoard(req);
    res.status(200).json(result);
  } catch (error) {
   return({
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
   return({
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
   return({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};
