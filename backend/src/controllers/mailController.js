const sendMail = require('../services/mail');
const { statusCode} = require('../config/default.json');

exports.mailRequest = async (req, res) => {
  try {
    // Extract email details from request body
    const { to, subject, message } = req.body;
    
    // Validate required fields
    if (!to || !subject || !message) {
      return res.status(400).json({
        statusCode: statusCode.BAD_REQUEST,
        success: false,
        message: 'Missing required fields: to, subject, message'
      });
    }
    
    // Send email using the sendMail service
    const result = await sendMail(to, subject, message);
    
    res.status(201).json({
      statusCode: statusCode.CREATED,
      success: true,
      message: 'Email sent successfully',
      data: {
        messageId: result.messageId,
        response: result.response
      }
    });

  } catch (error) {
    console.error('Error in mailRequest:', error);
    return res.status(500).json({
      statusCode: statusCode.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
    });
  }
};