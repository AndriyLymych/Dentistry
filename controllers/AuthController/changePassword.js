const {userService} = require('../../services');
const {CustomError, CustomErrorData} = require('../../error');
const {ResponseStatusCodes} = require('../../constant');
const {passwordHasher, passwordChecker} = require('../../helpers');

module.exports = async (req, res, next) => {
    try {

        const {password, newPassword, newPasswordAgain} = req.body;
        const {user_id: id} = req.user;

        const user = await userService.getUserById(id);

        await passwordChecker(user.password, password);

        if (newPassword !== newPasswordAgain) {

            throw new CustomError(
                ResponseStatusCodes.FORBIDDEN,
                CustomErrorData.FORBIDDEN_PASSWORDS_NOT_MATCH.message,
                CustomErrorData.FORBIDDEN_PASSWORDS_NOT_MATCH.code,
            )
        }

        const hashPass = await passwordHasher(newPassword);

        await userService.updateUserByParams({password: hashPass}, id);

        res.status(ResponseStatusCodes.CREATED).end()
    } catch (e) {
        next(new CustomError(e))

    }
}