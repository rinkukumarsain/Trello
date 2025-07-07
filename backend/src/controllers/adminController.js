const services = require('../services/adminService');

exports.login = async(req) => {
    try{
    await services.login(req);
}
catch(error){
    return{
        statusCode: statusCode.BAD_REQUEST,
        success: false,
        message:error.message
    }
}
}
exports.changePasswordController = async(req) => {
    try{
    await services.changePasswordController(req);
}
catch(error){
    return{
        statusCode: statusCode.INTERNAL_SERVER_ERROR,
        success: false,
        message:error.message
    }
}
}
exports.checkAuth = async(req) => {
    try{
    await services.checkAuth(req);
}
catch(error){
    return{
        statusCode: statusCode.BAD_REQUEST,
        success: false,
        message:error.message
    }
}
}
exports.updateAdminController = async(req) => {
    try{
    await services.updateAdminController(req);
}
catch(error){
    return{
        statusCode: statusCode.INTERNAL_SERVER_ERROR,
        success: false,
        message:error.message
    }
}
}