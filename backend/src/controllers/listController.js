const services = require('../services/listService')

exports.createList =  async(req) => {
    try{
        await services.createList(req);
    }
    catch(error){
        return{
            statusCode: statusCode.INTERNAL_SERVER_ERROR,
            success: false,
            message: error.message,
        }
    }
}

exports.viewList = async(req) => {
    try{
        await services.viewList(req);
    }
    catch(error){
        return{
            statusCode: statusCode.INTERNAL_SERVER_ERROR,
            success: false,
            message: error.message,
        }
    }
}

exports.viewBoard = async(req) => {
    try{
        await services.viewBoard(req);
    }
    catch(error){
        return{
        statusCode: statusCode.BAD_REQUEST,
        success: false,
        message:error.message
    }
    }
}

exports.updateList = async(req) => {
    try{
        await services.updateList(req);
    }
    catch(error){
        return{
        statusCode: statusCode.INTERNAL_SERVER_ERROR,
        success: false,
        message: error.message    
    }
    }
}
exports.deleteList = async(req) => {
    try{
        await services.deleteList(req);
    }
    catch(error){
        return{
            statusCode: statusCode.INTERNAL_SERVER_ERROR,
            success: false,
            message: error.message
        }
    }
}