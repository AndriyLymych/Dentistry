const jwt = require('jsonwebtoken');
const {promisify} = require('util');

const {ResponseStatusCodes} = require('../constant');
const {JWT_SECRET_REFRESH} = require('../config/configs');
const {CustomError, CustomErrorData} = require('../error');

const verify = promisify(jwt.verify);

module.exports = async token => {

    try {
        await verify(token, JWT_SECRET_REFRESH)
    } catch {
        throw   new CustomError(
            ResponseStatusCodes.UNAUTHORIZED,
            CustomErrorData.UNAUTHORIZED_BAD_REFRESH_TOKEN.message,
            CustomErrorData.UNAUTHORIZED_BAD_REFRESH_TOKEN.code,
        )

    }
};