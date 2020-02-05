const jwt = require('jsonwebtoken');

const {JWT_SECRET_CHANGE_PASSWORD} = require('../config/configs');
const {ResponseStatusCodes} = require('../constant');
const CustomError = require('../error/CustomError');

module.exports = token => {

    jwt.verify(token, JWT_SECRET_CHANGE_PASSWORD, err => {

        if (err) throw new CustomError('Token is not valid :(', ResponseStatusCodes.FORBIDDEN, 'verifyAccessToken')

    })
};