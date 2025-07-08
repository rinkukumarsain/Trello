const services = require('../services/cardService');
const { statusCode } = require('../../config/default.json');

exports.viewCard = async (req, res) => {
  try {
    const result = await services.viewCard(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};

exports.createCard = async (req, res) => {
  try {
    const result = await services.createCard(req); // ✅ Correct service
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};

exports.updateCard = async (req, res) => {
  try {
    const result = await services.updateCard(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const result = await services.deleteCard(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};
