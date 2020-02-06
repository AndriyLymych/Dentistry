const bcrypt = require('bcrypt');

const CustomError = require('../error/CustomError');
const {ResponseStatusCodes} = require('../constant');

module.exports = async (hashedPassword, password) => {

    let checkedPassword = await bcrypt.compare(password, hashedPassword);

    if (!checkedPassword) {
        throw new CustomError('User is not present', ResponseStatusCodes.NOT_FOUND, 'passwordChecker');
    }
}