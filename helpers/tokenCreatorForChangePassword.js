const jwt = require('jsonwebtoken');

const {JWT_SECRET} = require('../constant');

module.exports = () => {

    const token_for_change_password = jwt.sign(
        {},
        JWT_SECRET.JWT_SECRET_CHANGE_PASSWORD,
        {expiresIn: '2d'}
    );

    return {
        token_for_change_password
    }

}