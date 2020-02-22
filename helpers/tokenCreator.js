const jwt = require('jsonwebtoken');

const {
    JWT_SECRET_ACCESS,
    JWT_SECRET_REFRESH,
    JWT_SECRET_CHANGE_PASSWORD,
    ACCESS_TOKEN_LIFE,
    REFRESH_TOKEN_LIFE,
    TOKEN_FOR_RESET_PASSWORD_LIFE
} = require('../config/configs');

module.exports = () => {

    const access_token = jwt.sign({}, JWT_SECRET_ACCESS, {expiresIn: ACCESS_TOKEN_LIFE});
    const refresh_token = jwt.sign({}, JWT_SECRET_REFRESH, {expiresIn: REFRESH_TOKEN_LIFE});
    const token_for_change_password = jwt.sign(
        {},
        JWT_SECRET_CHANGE_PASSWORD,
        {expiresIn: TOKEN_FOR_RESET_PASSWORD_LIFE}
    );

    return {
        access_token,
        refresh_token,
        token_for_change_password
    }
};
