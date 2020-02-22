const jwt = require('jsonwebtoken');

const {
    JWT_SECRET_CHANGE_PASSWORD,
    TOKEN_FOR_RESET_PASSWORD_LIFE
} = require('../config/configs');

module.exports = () => {

    const action_token = jwt.sign(
        {},
        JWT_SECRET_CHANGE_PASSWORD,
        {expiresIn: TOKEN_FOR_RESET_PASSWORD_LIFE}
    );

    return {
        action_token
    }
};
