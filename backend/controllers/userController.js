const services = require('../services/userService');

exports.viewAllUser = async(req) => {
    try{
      await services.viewAllUser(req);
    }
    catch(error){
     return{
        statusCode: statusCode.INTERNAL_SERVER_ERROR,
        success: false
     }
    }
}


exports.createUser = async(req) => {
    try{
      await services.createUser(req);   
    }
    catch(error){
        return {
        statusCode: statusCode.BAD_REQUEST,
        success: false,
        message: error.message
        }
    }
}

exports.viewUserById = async(req) => {
    try{
        await services.viewUser(req);

    }
    catch(error){
        return {
            statusCode:statusCode.INTERNAL_SERVER_ERROR,
            success: false,
            message: error.message,
        }
    }
}