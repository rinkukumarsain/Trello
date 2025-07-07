const services = require('../services/activityService');

exports.createActivity = async(req) => {
    try{
    await services.createActivity(req);
}
catch(error){
    return{
        statusCode: statusCode.INTERNAL_SERVER_ERROR,
        success: false,
        message:error.message
    }
}
}

exports.viewActivity = async(req) => {
    try{
    await services.viewActivity(req);
}
catch(error){
    return{
        statusCode: statusCode.INTERNAL_SERVER_ERROR,
        success: false,
        message:error.message
    }
}
}