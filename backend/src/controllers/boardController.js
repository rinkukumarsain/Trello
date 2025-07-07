const services = require('../services/boardService');

exports.viewBoard = async(req) => {
    try{
    await services.viewBoard(req);
}
catch(error){
    return{
        statusCode: statusCode.INTERNAL_SERVER_ERROR,
        success: false,
        message:error.message
    }
}
}
exports.allBoard = async(req) => {
    try{
    await services.allBoard(req);
}
catch(error){
    return{
        statusCode: statusCode.INTERNAL_SERVER_ERROR,
        success: false,
        message:error.message
    }
}
}
exports.updateBoard = async(req) => {
    try{
    await services.updateBoard(req);
}
catch(error){
    return{
        statusCode: statusCode.INTERNAL_SERVER_ERROR,
        success: false,
        message:error.message
    }
}
}
exports.deleteBoard = async(req) => {
    try{
    await services.deleteBoard(req);
}
catch(error){
    return{
        statusCode: statusCode.INTERNAL_SERVER_ERROR,
        success: false,
        message:error.message
    }
}
}