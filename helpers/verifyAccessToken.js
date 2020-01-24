const jwt = require('jsonwebtoken');

const {JWT_SECRET, ResponseStatusCodes} = require('../constant');
const CustomError = require('../error/CustomError');

module.exports = token => {

    jwt.verify(token, JWT_SECRET.JWT_SECRET_ACCESS, err => {

        if (err) throw new CustomError('Token is not valid :(', ResponseStatusCodes.FORBIDDEN, 'verifyAccessToken')

    })
};