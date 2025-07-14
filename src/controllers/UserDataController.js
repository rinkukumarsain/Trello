const services = require('../services/userDataService');
const { statusCode } = require('../config/default.json');


exports.viewAllUser = async (req, res) => {
  try {
    const result = await services.viewAllUser(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};

exports.viewUserById = async (req, res) => {
  try {
    const result = await services.viewUserById(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};

