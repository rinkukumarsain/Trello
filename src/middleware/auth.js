const jwt = require("jsonwebtoken");
const User = require('../models/user.model'); 
const { statusCode, resMessage } = require('../config/default.json');

const SECRET_KEY = process.env.SECRET_KEY;

// Verify token middleware
exports.auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(statusCode.UNAUTHORIZED).json({
                statusCode: statusCode.UNAUTHORIZED,
                success: false,
                message: resMessage.Token_Required
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, SECRET_KEY);
        if (!decoded || !decoded._id) {
            return res.status(statusCode.UNAUTHORIZED).json({
                statusCode: statusCode.UNAUTHORIZED,
                success: false,
                message: resMessage.Invalid_Token
            });
        }

        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(statusCode.UNAUTHORIZED).json({
                statusCode: statusCode.UNAUTHORIZED,
                success: false,
                message: resMessage.Invalid_Token
            });
        }

        req.auth = user; // Attaching user to request
        next();

    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(statusCode.UNAUTHORIZED).json({
                statusCode: statusCode.UNAUTHORIZED,
                success: false,
                message: "Token Expired",
                error: error.message
            });
        }

        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({
            statusCode: statusCode.INTERNAL_SERVER_ERROR,
            success: false,
            message: resMessage.INTERNAL_SERVER_ERROR,
            error: error.message || 'An error occurred while verifying the token'
        });
    }
};

exports.authorize = (allowedRoles = []) => (req, res, next) => {
    const userRole = req.auth?.role;
    if (!allowedRoles.includes(userRole)) {
        return res.status(statusCode.ACCESS_DENIED).json({
            statusCode: statusCode.ACCESS_DENIED,
            success: false,
            message: resMessage.ACCESS_DENIED
        });
    }
    next();
};










// const jwt = require('jsonwebtoken');
// const { statusCode, resMessage } = require('../../config/default.json');


// exports.verifyToken = async (req, res, next) => {
//     try {
//         const token = req.headers.authorization?.split(' ')[1];
//         if (!token) {
//             return res.status(401).json({
//                 statusCode: statusCode.UNAUTHORIZED,
//                 success: false,
//                 message: resMessage.Token_Required
//             });
//         }
//         jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//             if (err) {
//                 return res.status(401).json({
//                     statusCode: statusCode.UNAUTHORIZED,
//                     success: false,
//                     message: resMessage.Invalid_Token
//                 });
//             }
//             req.auth = decoded;
//             next();
//         });
//     } catch (error) {
//         return res.json({
//             statusCode: statusCode.INTERNAL_SERVER_ERROR,
//             success: false,
//             message: resMessage.Internal_Server_Error,
//             error: error.message || 'An error occurred while verifying the token'
//         });
//     }
// };

