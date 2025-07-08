const services = require('../services/cardService');
const { statusCode } = require('../../config/default.json');

exports.viewCard = async (req, res) => {
  try {
    const result = await services.viewCard(req);
    res.status(200).json(result);
  } catch (error) {
return({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};

exports.createCard = async (req, res) => {
  try {
    const result = await services.create(req); 
    res.status(200).json(result);
  } catch (error) {
return({
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
return({
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
return({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};
