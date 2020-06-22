const jwt = require('jsonwebtoken');

const {JWT_SECRET_ACCESS} = require('../config/configs');
const {ResponseStatusCodes} = require('../constant');
const {CustomError, CustomErrorData} = require('../error');

module.exports = token => {

    jwt.verify(token, JWT_SECRET_ACCESS, err => {

        if (err) {
            throw new CustomError(
                ResponseStatusCodes.UNAUTHORIZED,
                CustomErrorData.UNAUTHORIZED_BAD_TOKEN.message,
                CustomErrorData.UNAUTHORIZED_BAD_TOKEN.code,
            )
        }

    })
};