const services = require('../services/labelService')
const { statusCode } = require('../../config/default.json');


exports.createLabel = async (req, res) => {
  try {
    const result = await services.createLabel(req);
    res.status(200).json(result);
  } catch (error) {
  return({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};
exports.getLabelByBoard = async(req, res) => {
  try{
    const result = await services.getLabel(req);
    res.status(200).json(result);
  }
  catch(error){
  return({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message
    });
  }
};

exports.updateLabel = async(req, res) => {
  try{
    const result = await services.updateLabel(req);
    res.status(200).json(result);
  }
  catch(error){
  return({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message
    });
  }
};

exports.deleteLabel = async(req, res)=>{
  try{
    const result = await services.deleteLabel(req);
    res.status(200).json(result);
  }
  catch(error){
    return({
    statusCode: statusCode.INTERNAL_SERVER_ERROR,
    success: false,
    message: error
    })
  }

}