const services = require('../services/activityService');
const { statusCode } = require('../config/default.json');

// Create Activity
exports.createActivity = async (req, res) => {
  try {
    const result = await services.createActivity(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};

// View Activity by Board ID
exports.viewActivity = async (req, res) => {
  try {
    const result = await services.viewActivity(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};
