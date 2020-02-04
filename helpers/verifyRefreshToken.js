const jwt = require('jsonwebtoken');

const {ResponseStatusCodes} = require('../constant');
const {JWT_SECRET_REFRESH} = require('../config/configs');
const CustomError = require('../error/CustomError');

module.exports = token => {

    jwt.verify(token, JWT_SECRET_REFRESH, err => {
        if (err) throw new CustomError('Token is not valid :(', ResponseStatusCodes.FORBIDDEN, 'verifyRefreshToken')
    })
};