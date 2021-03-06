const bcrypt = require('bcrypt');

const {CustomError, CustomErrorData} = require('../error');
const {ResponseStatusCodes} = require('../constant');

module.exports = async (hashedPassword, password) => {

    let checkedPassword = await bcrypt.compare(password, hashedPassword);

    if (!checkedPassword) {
        throw new CustomError(
            ResponseStatusCodes.BAD_REQUEST,
            CustomErrorData.BAD_REQUEST_WRONG_PASSWORD.message,
            CustomErrorData.BAD_REQUEST_WRONG_PASSWORD.code,
        )
    }
}