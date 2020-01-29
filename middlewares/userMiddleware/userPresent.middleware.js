const {userService} = require('../../services');
const CustomError = require('../../error/CustomError');
const {ResponseStatusCodes} = require('../../constant');

module.exports = async (req, res, next) => {
    const {id} = req.params;

    const user = await userService.getUserById(id);

    if (!user) {
        return next(
            new CustomError('User is not present', ResponseStatusCodes.NOT_FOUND, 'userPresent.middleware')
        )
    }

    req.user = user
}