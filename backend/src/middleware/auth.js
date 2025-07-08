const jwt = require('jsonwebtoken');
const { statusCode, resMessage } = require('../../config/default.json');

exports.verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        statusCode: statusCode.UNAUTHORIZED,
        success: false,
        message: resMessage.Token_Required
      });
    }

    const token = authHeader.split(' ')[1]; // split by space not dot

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          statusCode: statusCode.UNAUTHORIZED,
          success: false,
          message: resMessage.Invalid_Token
        });
      }

      req.auth = decoded; // You can now access req.auth.userId or whatever you encoded
      next();
    });

  } catch (error) {
    return res.status(500).json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: resMessage.INTERNAL_SERVER_ERROR,
      error: error.message || "An error occurred while verifying the token"
    });
  }
};
