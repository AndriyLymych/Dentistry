const jwt = require('jsonwebtoken');

const {ResponseStatusCodes} = require('../constant');
const {JWT_SECRET_REFRESH} = require('../config/configs');
const {CustomError, CustomErrorData} = require('../error');

module.exports = token => {

    jwt.verify(token, JWT_SECRET_REFRESH, err => {
        if (err) {
            throw new CustomError(
                ResponseStatusCodes.UNAUTHORIZED,
                CustomErrorData.UNAUTHORIZED_BAD_TOKEN.message,
                CustomErrorData.UNAUTHORIZED_BAD_TOKEN.code,
            )
        }
    })
};