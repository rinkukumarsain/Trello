const services = require('../services/userService');
const { statusCode } = require('../../config/default.json');

exports.viewAllUser = async (req, res) => {
  try {
    const result = await services.viewAllUser(req);
    res.status(200).json(result);
  } catch (error) {
    return({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const result = await services.createUser(req);
    res.status(201).json(result);
  } catch (error) {
   return({
      statusCode: statusCode.BAD_REQUEST,
      success: false,
      message: error.message
    });
  }
};

exports.viewUserById = async (req, res) => {
  try {
    const result = await services.viewUserById(req);
    res.status(200).json(result);
  } catch (error) {
    return({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message
    });
  }
};
