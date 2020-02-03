const jwt = require('jsonwebtoken');

const {JWT_SECRET_ACCESS, JWT_SECRET_REFRESH} = require('../config/configs');

module.exports = () => {
// TODO replace expiresIn to config
    const access_token = jwt.sign({}, JWT_SECRET_ACCESS, {expiresIn: '10d'});
    const refresh_token = jwt.sign({}, JWT_SECRET_REFRESH, {expiresIn: '90d'});

    return {
        access_token,
        refresh_token
    }
};
