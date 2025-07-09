const services = require('../services/activityService');
const { statusCode } = require('../config/default.json');

exports.createActivity = async (req, res) => {
  try {
    const result = await services.createActivity(req);
    res.status(201).json(result);
  } catch (error) {
   return({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message
    });
  }
};

exports.viewActivity = async (req, res) => {
  try {
    const result = await services.viewActivity(req);
    res.status(200).json(result);
  } catch (error) {
   return({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message
    });
  }
};
