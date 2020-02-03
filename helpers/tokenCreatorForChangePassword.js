const jwt = require('jsonwebtoken');

const {JWT_SECRET_CHANGE_PASSWORD} = require('../config/configs');

module.exports = () => {

    const token_for_change_password = jwt.sign(
        {},
        JWT_SECRET_CHANGE_PASSWORD,
        {expiresIn: '2d'} // TODO constants !
    );

    return {
        token_for_change_password
    }
};
