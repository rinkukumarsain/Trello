const services = require('../services/cardService');

exports.viewCard = async (req) => {
    try {
   await services.viewCard(req);
    
    } catch (error) {
        return {
            statusCode: statusCode.INTERNAL_SERVER_ERROR,
            success: false,
            message: error.message
        };
    }
};
exports.createCard = async(req) => {
    try{
        await services.viewCard(req);
    }
    catch(error){
        return{
            statusCode: statusCode.INTERNAL_SERVER_ERROR,
            success: false,
            message: error.message

        }
    }
}

exports.updateCard = async(req) => {
    try{
        await services.updateCard(req);
    }
    catch(error){
        return{
            statusCode: statusCode.INTERNAL_SERVER_ERROR,
            success: false,
           message: error.message
        }
    }
}

exports.deleteCard = async(req) => {
    try{
        await services.deleteCard(req);

    }
    catch(error){
        return{
            statusCode: statusCode.INTERNAL_SERVER_ERROR,
            success: false,
            message: error.message
        }
    }
}

