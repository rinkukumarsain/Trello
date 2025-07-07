const {userV1Prefix} = require('../config/default.json') 
module.exports = (app) => {
    app.use(`${userV1Prefix}/api`,require('./routes'));
} 