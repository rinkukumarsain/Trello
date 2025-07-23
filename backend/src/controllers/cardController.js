const services = require('../services/cardService');
const { statusCode } = require('../config/default.json');

// View Cards
exports.viewCard = async (req, res) => {
  try {
    const result = await services.viewCard(req);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};

// Create Card
exports.createCard = async (req, res) => {
  try {
    const result = await services.createCard(req); 
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};

// Update Card
exports.updateCard = async (req, res) => {
  try {
    const result = await services.updateCard(req);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};

// Delete Card
exports.deleteCard = async (req, res) => {
  try {
    const result = await services.deleteCard(req);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};

exports.commentCard = async (req, res) => {
  try {
    const result = await services.addComment(req);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};

