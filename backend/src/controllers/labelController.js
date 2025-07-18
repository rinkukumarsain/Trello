const services = require('../services/labelService');
const { statusCode } = require('../config/default.json');

// Create Label
exports.createLabel = async (req, res) => {
  try {
    const result = await services.createLabel(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};

// Get Labels by Board ID
exports.getLabelByBoard = async (req, res) => {
  try {
    const result = await services.getLabelByBoard(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};

// Update Label
exports.updateLabel = async (req, res) => {
  try {
    const result = await services.updateLabel(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};

// Delete Label
exports.deleteLabel = async (req, res) => {
  try {
    const result = await services.deleteLabel(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};
