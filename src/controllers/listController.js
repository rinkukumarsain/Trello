const services = require('../services/listService');
const { statusCode } = require('../config/default.json');

exports.createList = async (req, res) => {
  try {
    const result = await services.createList(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};

exports.viewList = async (req, res) => {
  try {
    const result = await services.viewList(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};

exports.Board = async (req, res) => {
  try {
    const result = await services.viewBoard(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message,
    });
  }
};

exports.updateList = async (req, res) => {
  try {
    const result = await services.updateList(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};

exports.deleteList = async (req, res) => {
  try {
    const result = await services.deleteList(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};
